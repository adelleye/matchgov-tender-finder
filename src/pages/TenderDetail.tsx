
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTenderById, Tender } from "../services/tenderService";
import TenderDetailHeader from "../components/TenderDetailHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const TenderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTender = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getTenderById(id);
        if (data) {
          setTender(data);
        } else {
          setError("Tender not found");
        }
      } catch (err) {
        setError("Failed to load tender");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTender();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !tender) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error || "Tender not found"}</p>
        <p className="text-muted-foreground">
          The tender you're looking for might have been removed or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <TenderDetailHeader tender={tender} />

      <Card className="mb-8">
        <CardContent className="p-6">
          <Tabs defaultValue="english">
            <TabsList className="mb-4">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="french">French</TabsTrigger>
            </TabsList>

            <TabsContent value="english" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Tender Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {tender.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Buyer Information</h3>
                <p className="text-muted-foreground">
                  <strong>Organization:</strong> {tender.buyer}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Key Dates</h3>
                <p className="text-muted-foreground">
                  <strong>Closing Date:</strong> {tender.closingDate}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="french" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description de l'appel d'offres</h2>
                <p className="text-muted-foreground italic">
                  [French translation would be available here in the actual application]
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Why This Matched</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Match Score</h3>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${tender.matchScore ? tender.matchScore * 100 : 0}%` }} 
                />
              </div>
              <p className="text-sm mt-1">
                {tender.matchScore ? `${Math.round(tender.matchScore * 100)}%` : '0%'} match with your profile
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Matching NAICS Codes</h3>
              <div className="flex flex-wrap gap-2">
                {tender.naicsCodes.map((code) => (
                  <span key={code} className="badge-naics">
                    {code}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Matching Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {tender.tags.map((tag) => (
                  <span key={tag} className="badge-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenderDetail;
