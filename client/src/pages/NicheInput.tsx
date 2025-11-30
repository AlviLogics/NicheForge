import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Wand2 } from "lucide-react";

export default function NicheInput() {
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setLocation(`/results?niche=${encodeURIComponent(niche)}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] opacity-30" />

        <div className="w-full max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary/20">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What's Your Niche?
              </h1>
              <p className="text-muted-foreground text-lg">
                Enter any topic, hobby, or industry. We'll build your entire YouTube empire around it.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-muted-foreground w-6 h-6" />
                  <Input 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g. Urban Gardening, Crypto Trading, ASMR Cooking..." 
                    className="h-16 pl-14 text-lg bg-background/90 border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!niche || isLoading}
                className="w-full h-14 text-lg bg-white text-black hover:bg-gray-200 font-semibold rounded-xl shadow-lg transition-all transform active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                    Analyzing Market Data...
                  </span>
                ) : (
                  "Generate Full Strategy"
                )}
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Tech Reviews", "Personal Finance", "Fitness", "True Crime"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setNiche(tag)}
                  className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
