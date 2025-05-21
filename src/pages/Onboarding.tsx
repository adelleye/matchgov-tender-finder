
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";

// Mock NAICS codes for suggestion
const suggestedNaics = [
  { code: "541512", description: "Computer Systems Design Services" },
  { code: "541519", description: "Other Computer Related Services" },
  { code: "541611", description: "Administrative Management Consulting" },
  { code: "541330", description: "Engineering Services" },
  { code: "541990", description: "All Other Professional Services" }
];

// Canadian provinces
const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
  "Newfoundland and Labrador", "Nova Scotia", "Ontario", 
  "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon"
];

const OnboardingStart = () => {
  const [businessDescription, setBusinessDescription] = useState("");
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (businessDescription.trim().length > 0) {
      navigate("/onboarding/industry");
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tell us what your business does</h1>
      <p className="text-muted-foreground mb-6">
        This helps us find the most relevant opportunities for you. Be specific about your expertise, services, and products.
      </p>
      
      <div className="space-y-4">
        <Textarea
          placeholder="e.g., We provide IT consulting services specializing in cybersecurity solutions for healthcare and financial institutions..."
          className="min-h-[150px]"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
        />
        
        <div className="pt-4">
          <Button onClick={handleNext} disabled={!businessDescription.trim()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingIndustry = () => {
  const [selectedNaics, setSelectedNaics] = useState<string[]>([
    suggestedNaics[0].code,
    suggestedNaics[1].code
  ]);
  const [customCode, setCustomCode] = useState("");
  const navigate = useNavigate();
  
  const toggleNaics = (code: string) => {
    if (selectedNaics.includes(code)) {
      setSelectedNaics(selectedNaics.filter(c => c !== code));
    } else {
      setSelectedNaics([...selectedNaics, code]);
    }
  };
  
  const addCustomCode = () => {
    if (customCode && !selectedNaics.includes(customCode)) {
      setSelectedNaics([...selectedNaics, customCode]);
      setCustomCode("");
    }
  };
  
  const handleNext = () => {
    if (selectedNaics.length > 0) {
      navigate("/onboarding/value");
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Select your industry codes</h1>
      <p className="text-muted-foreground mb-6">
        We've identified these NAICS codes based on your description. Select all that apply to your business.
      </p>
      
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {suggestedNaics.map((naics) => (
            <Badge
              key={naics.code}
              variant={selectedNaics.includes(naics.code) ? "default" : "outline"}
              className="cursor-pointer text-sm py-2 px-3"
              onClick={() => toggleNaics(naics.code)}
            >
              {naics.code} - {naics.description}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add custom NAICS code"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="flex-1"
          />
          <Button variant="secondary" onClick={addCustomCode} disabled={!customCode}>
            Add
          </Button>
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding/start")}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={selectedNaics.length === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingValue = () => {
  const [valueRange, setValueRange] = useState<number[]>([50000, 250000]);
  const navigate = useNavigate();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const handleNext = () => {
    navigate("/onboarding/region");
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Preferred Contract Value</h1>
      <p className="text-muted-foreground mb-6">
        Select the contract value range you're most interested in.
      </p>
      
      <div className="space-y-8">
        <div className="space-y-6">
          <Slider
            defaultValue={valueRange}
            max={1000000}
            min={5000}
            step={5000}
            onValueChange={setValueRange}
            className="py-4"
          />
          
          <div className="flex justify-between text-sm">
            <span>
              Min: <strong>{formatCurrency(valueRange[0])}</strong>
            </span>
            <span>
              Max: <strong>{formatCurrency(valueRange[1])}</strong>
            </span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding/industry")}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingRegion = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All of Canada");
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFinish = () => {
    setIsSubmitting(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      updateUser({ profileCompleted: true });
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Select Your Region</h1>
      <p className="text-muted-foreground mb-6">
        Choose the regions where you're interested in doing business.
      </p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="region">Preferred Region</Label>
          <Select
            value={selectedRegion}
            onValueChange={setSelectedRegion}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All of Canada">All of Canada</SelectItem>
              <SelectItem value="Remote Only">Remote Only</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding/value")}>
            Back
          </Button>
          <Button onClick={handleFinish} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finishing Setup
              </>
            ) : (
              "Finish Setup"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Onboarding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8">
          <Routes>
            <Route path="/start" element={<OnboardingStart />} />
            <Route path="/industry" element={<OnboardingIndustry />} />
            <Route path="/value" element={<OnboardingValue />} />
            <Route path="/region" element={<OnboardingRegion />} />
          </Routes>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
