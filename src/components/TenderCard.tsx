
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tender } from "../services/tenderService";
import { formatDistanceToNow } from "date-fns";
import { BookmarkPlus, X } from "lucide-react";

interface TenderCardProps {
  tender: Tender;
}

const TenderCard: React.FC<TenderCardProps> = ({ tender }) => {
  const daysToDeadline = () => {
    const deadline = new Date(tender.deadline);
    return formatDistanceToNow(deadline, { addSuffix: true });
  };

  return (
    <Card className="tender-card overflow-hidden border border-border/60">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium line-clamp-2">
              <Link to={`/tender/${tender.id}`} className="hover:text-primary">
                {tender.title}
              </Link>
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {tender.department}
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium py-1 px-2 rounded-full bg-primary/20 text-primary">
              Deadline: {daysToDeadline()}
            </span>
            
            {tender.value && (
              <span className="text-xs font-medium py-1 px-2 rounded-full bg-secondary">
                {tender.value}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {tender.naicsCodes.map((code) => (
              <Badge key={code} variant="secondary" className="badge-naics">
                NAICS: {code}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tender.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="badge-tag">
                {tag}
              </Badge>
            ))}
          </div>
          
          {tender.matchScore && (
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-1">Match Score</div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${tender.matchScore * 100}%` }} 
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <X className="h-4 w-4 mr-1" /> Ignore
        </Button>
        <Button variant="default" size="sm">
          <BookmarkPlus className="h-4 w-4 mr-1" /> Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenderCard;
