
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Canadian provinces
const provinces = [
  "All of Canada",
  "Remote Only",
  "Alberta", 
  "British Columbia", 
  "Manitoba", 
  "New Brunswick", 
  "Newfoundland and Labrador", 
  "Nova Scotia", 
  "Ontario", 
  "Prince Edward Island", 
  "Quebec", 
  "Saskatchewan",
  "Northwest Territories", 
  "Nunavut", 
  "Yukon"
];

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState({
    businessDescription: "We provide IT consulting services specializing in cybersecurity solutions for healthcare and financial institutions, including network security assessments, compliance consulting, and security awareness training.",
    naicsCodes: ["541512", "541519"],
    valueRange: [50000, 250000],
    region: "Ontario"
  });
  const [newNaicsCode, setNewNaicsCode] = useState("");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handleRemoveNaicsCode = (code: string) => {
    setProfile({
      ...profile,
      naicsCodes: profile.naicsCodes.filter(c => c !== code)
    });
  };
  
  const handleAddNaicsCode = () => {
    if (newNaicsCode && !profile.naicsCodes.includes(newNaicsCode)) {
      setProfile({
        ...profile,
        naicsCodes: [...profile.naicsCodes, newNaicsCode]
      });
      setNewNaicsCode("");
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">Update your business profile to improve tender matching</p>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="businessDescription" className="text-lg">What does your business do?</Label>
          <Textarea 
            id="businessDescription"
            value={profile.businessDescription}
            onChange={(e) => setProfile({ ...profile, businessDescription: e.target.value })}
            className="min-h-[150px]"
          />
        </div>
        
        <div className="space-y-4">
          <Label className="text-lg">NAICS Codes</Label>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.naicsCodes.map((code) => (
              <Badge key={code} variant="secondary" className="flex items-center gap-1 py-1">
                {code}
                <button 
                  onClick={() => handleRemoveNaicsCode(code)}
                  className="ml-1 h-4 w-4 rounded-full flex items-center justify-center"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add NAICS code"
              value={newNaicsCode}
              onChange={(e) => setNewNaicsCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" onClick={handleAddNaicsCode} disabled={!newNaicsCode}>
              Add
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-lg">Preferred Contract Value Range</Label>
          
          <Slider
            value={profile.valueRange}
            max={1000000}
            min={5000}
            step={5000}
            onValueChange={(value) => setProfile({ ...profile, valueRange: value })}
            className="py-4"
          />
          
          <div className="flex justify-between text-sm">
            <span>
              Min: <strong>{formatCurrency(profile.valueRange[0])}</strong>
            </span>
            <span>
              Max: <strong>{formatCurrency(profile.valueRange[1])}</strong>
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="region" className="text-lg">Preferred Region</Label>
          <Select
            value={profile.region}
            onValueChange={(value) => setProfile({ ...profile, region: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-4">
          <Button onClick={handleSaveProfile} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </div>
      
      <div className="border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
        <Button variant="destructive">Delete My Account</Button>
      </div>
    </div>
  );
};

export default Profile;
