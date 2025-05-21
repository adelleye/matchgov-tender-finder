
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getTendersByCategory, Tender } from "../services/tenderService";
import TenderCard from "../components/TenderCard";
import TabNavigation from "../components/TabNavigation";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { tabId = "new" } = useParams<{ tabId?: string }>();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenders = async () => {
      setLoading(true);
      try {
        const category = (tabId === "saved" || tabId === "ignored") ? tabId : "new";
        const data = await getTendersByCategory(category);
        setTenders(data);
      } catch (error) {
        console.error("Error loading tenders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTenders();
  }, [tabId]);

  const tabs = [
    { id: "new", label: "New Matches", path: "/dashboard" },
    { id: "saved", label: "Saved", path: "/dashboard/saved" },
    { id: "ignored", label: "Ignored", path: "/dashboard/ignored" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
      </div>

      <TabNavigation tabs={tabs} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : tenders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {tabId === "saved"
              ? "You haven't saved any tenders yet."
              : tabId === "ignored"
              ? "You haven't ignored any tenders yet."
              : "No new matches found. Check back soon!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
