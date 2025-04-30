
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 opacity-90">Oops! The page you're looking for cannot be found.</p>
        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
          <a href="/">
            <Home className="mr-2 h-5 w-5" /> Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
