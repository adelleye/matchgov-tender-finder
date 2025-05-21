
import { Tender } from "../services/tenderService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookmarkPlus, X } from "lucide-react";
import { Link } from "react-router-dom";

interface TenderDetailHeaderProps {
  tender: Tender;
}

const TenderDetailHeader: React.FC<TenderDetailHeaderProps> = ({ tender }) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <Link to="/dashboard" className="text-primary flex items-center hover:underline text-sm mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-2">{tender.title}</h1>
        <p className="text-muted-foreground">{tender.department}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          Deadline: {tender.deadline}
        </Badge>
        
        {tender.value && (
          <Badge variant="outline" className="bg-secondary/50 border-secondary/30">
            {tender.value}
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tender.naicsCodes.map((code) => (
          <Badge key={code} variant="secondary" className="badge-naics">
            NAICS: {code}
          </Badge>
        ))}
        
        {tender.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="badge-tag">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button variant="outline" size="sm">
          <X className="h-4 w-4 mr-1" /> Ignore
        </Button>
        <Button size="sm">
          <BookmarkPlus className="h-4 w-4 mr-1" /> Save
        </Button>
      </div>
    </div>
  );
};

export default TenderDetailHeader;
