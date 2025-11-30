import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import heroBg from "@assets/generated_images/dark_futuristic_abstract_background_with_neon_red_accents.png";
import thumb1 from "@assets/generated_images/viral_youtube_thumbnail_style_image_for_tech_reviews.png";
import thumb2 from "@assets/generated_images/viral_youtube_thumbnail_style_image_for_finance.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-6 backdrop-blur-sm text-primary-foreground/80">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>AI-Powered YouTube Strategy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-tight">
              Go Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">On Demand</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop guessing what works. Input your niche and instantly get viral video ideas, 
              scripts, thumbnails, and a complete channel strategy powered by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/input">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-8 text-lg shadow-[0_0_30px_-10px_rgba(255,0,0,0.6)] w-full sm:w-auto">
                  Generate Strategy <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                View Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <ShowcaseCard 
              title="Viral Concepts"
              description="AI generates titles & hooks proven to get clicks."
              image={thumb1}
              icon={<Zap className="text-yellow-400" />}
              delay={0.1}
            />
             <ShowcaseCard 
              title="Deep Analysis"
              description="Understand your competition and revenue potential."
              image={heroBg} 
              icon={<TrendingUp className="text-primary" />}
              delay={0.2}
              isAbstract
            />
             <ShowcaseCard 
              title="Profit Strategy"
              description="Monetization roadmaps tailored to your niche."
              image={thumb2}
              icon={<Sparkles className="text-purple-400" />}
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ShowcaseCard({ title, description, image, icon, delay, isAbstract }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors"
    >
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            isAbstract && "opacity-50"
          )} 
        />
        <div className="absolute bottom-4 left-4 z-20">
          <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
