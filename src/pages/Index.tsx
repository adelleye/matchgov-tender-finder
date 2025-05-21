
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative isolate">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              AI-Powered Tender Matching for{" "}
              <span className="text-primary">Canadian Businesses</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              GovConnect uses artificial intelligence to automatically match your business profile with relevant government tenders, saving you time and increasing your chances of winning contracts.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button size="lg" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform simplifies the process of finding and applying for government contracts tailored to your business capabilities.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold">Create Your Profile</h3>
              <p className="mt-2 text-muted-foreground">
                Tell us about your business and areas of expertise.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold">Get Matched</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI analyzes thousands of tenders to find your perfect matches.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold">Apply and Win</h3>
              <p className="mt-2 text-muted-foreground">
                Receive daily alerts and apply to opportunities with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
