
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  containerClass?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  containerClass = "mb-6" 
}) => {
  const location = useLocation();
  
  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className={cn("border-b border-border", containerClass)}>
      <nav className="flex -mb-px" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={cn(
              "py-4 px-6 border-b-2 text-sm font-medium whitespace-nowrap",
              isActiveTab(tab.path)
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
            aria-current={isActiveTab(tab.path) ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
