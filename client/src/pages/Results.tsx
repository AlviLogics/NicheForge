import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { generateNicheStrategy, NicheData } from "@/lib/mock-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { 
  Target, Video, Users, DollarSign, FileText, Share2, Download, ArrowLeft, 
  CheckCircle2, TrendingUp, Youtube, PlayCircle 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Results() {
  const [location] = useLocation();
  const [data, setData] = useState<NicheData | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse niche from URL query params manually since wouter hook is simpler
  const niche = new URLSearchParams(window.location.search).get("niche") || "";

  useEffect(() => {
    if (!niche) {
      setLoading(false);
      return;
    }

    setLoading(true);
    generateNicheStrategy(niche).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [niche]);

  if (!niche) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">No niche specified.</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-2" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
            </Button>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              Strategy for: <span className="text-primary">{niche}</span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : data ? (
          <ResultsContent data={data} />
        ) : (
          <div>Error loading data.</div>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl bg-white/5" />
        ))}
      </div>
      <Skeleton className="h-[400px] rounded-xl bg-white/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[300px] rounded-xl bg-white/5" />
        <Skeleton className="h-[300px] rounded-xl bg-white/5" />
      </div>
    </div>
  );
}

function ResultsContent({ data }: { data: NicheData }) {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Competition" 
          value={data.analysis.competition} 
          subtext={`Score: ${data.analysis.competitionScore}/100`}
          icon={<Target className="w-5 h-5 text-red-500" />}
          color="red"
        />
        <KpiCard 
          title="Demand" 
          value={data.analysis.demand} 
          subtext={`Score: ${data.analysis.demandScore}/100`}
          icon={<Users className="w-5 h-5 text-green-500" />}
          color="green"
        />
        <KpiCard 
          title="Est. CPM" 
          value={data.analysis.cpm} 
          subtext="High revenue potential"
          icon={<DollarSign className="w-5 h-5 text-yellow-500" />}
          color="yellow"
        />
        <KpiCard 
          title="Strategy Type" 
          value="Growth" 
          subtext={data.strategy.uploadSchedule}
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
          color="blue"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="ideas" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-white/5 border border-white/10 rounded-xl mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="ideas" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-6 rounded-lg">
            <Video className="w-4 h-4 mr-2" /> Viral Ideas
          </TabsTrigger>
          <TabsTrigger value="strategy" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-6 rounded-lg">
            <Target className="w-4 h-4 mr-2" /> Channel Strategy
          </TabsTrigger>
          <TabsTrigger value="script" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-6 rounded-lg">
            <FileText className="w-4 h-4 mr-2" /> Script Generator
          </TabsTrigger>
          <TabsTrigger value="money" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-6 rounded-lg">
            <DollarSign className="w-4 h-4 mr-2" /> Monetization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ideas" className="space-y-6">
          <div className="grid gap-6">
            {data.viralIdeas.map((idea, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
              >
                <Card className="bg-card/40 backdrop-blur border-white/10 hover:border-primary/50 transition-all group overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail Preview Placeholder */}
                    <div className="w-full md:w-64 aspect-video bg-black/40 relative flex-shrink-0 flex items-center justify-center border-r border-white/5">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
                      <Youtube className="w-12 h-12 text-white/20 group-hover:text-red-500 transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">12:45</div>
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">
                          {idea.title}
                        </h3>
                        <Badge variant={idea.viralScore > 90 ? "default" : "secondary"} className={idea.viralScore > 90 ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}>
                          Viral Score: {idea.viralScore}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 text-sm italic">"{idea.hook}"</p>
                      
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5 mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Thumbnail Concept</span>
                        <p className="text-sm text-gray-300 mt-1">{idea.thumbnailConfig}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8">Generate Script</Button>
                        <Button size="sm" variant="outline" className="h-8 border-white/10">Save Idea</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/40 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Content Pillars
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.strategy.contentPillars.map((pillar, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{pillar.title}</h4>
                      <p className="text-sm text-muted-foreground">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" /> Audience Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{data.analysis.demographics}</p>
                <div className="h-64 w-full mt-4">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: '18-24', value: 30 },
                      { name: '25-34', value: 45 },
                      { name: '35-44', value: 15 },
                      { name: '45+', value: 10 },
                    ]}>
                      <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                        cursor={{fill: 'transparent'}}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {/* Using cell colors manually */}
                        <Cell fill="#ef4444" />
                        <Cell fill="#ef4444" opacity={0.8} />
                        <Cell fill="#ef4444" opacity={0.6} />
                        <Cell fill="#ef4444" opacity={0.4} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="script">
          <Card className="bg-card/40 border-white/10">
             <CardHeader className="border-b border-white/5">
               <div className="flex justify-between items-center">
                 <div>
                   <CardTitle>Script: {data.sampleScript.title}</CardTitle>
                   <CardDescription>Optimized for retention and engagement</CardDescription>
                 </div>
                 <Button variant="outline" size="sm">Copy to Clipboard</Button>
               </div>
             </CardHeader>
             <CardContent className="p-0">
               <div className="divide-y divide-white/5">
                 {data.sampleScript.sections.map((section, idx) => (
                   <div key={idx} className="grid grid-cols-[100px_1fr] gap-4 p-6 hover:bg-white/5 transition-colors">
                     <div className="text-sm text-muted-foreground font-mono">{section.time}</div>
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 mb-1">
                         <Badge variant="outline" className="text-[10px] h-5 px-1.5">{section.speaker}</Badge>
                       </div>
                       <div className="text-sm font-medium text-primary-foreground/80 mb-2">
                         Visuals: <span className="text-muted-foreground italic font-normal">{section.visuals}</span>
                       </div>
                       <div className="p-3 bg-black/20 rounded border border-white/5 text-sm text-gray-300 leading-relaxed">
                         (Script content placeholder generated by AI based on section context...)
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="money">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {data.monetization.map((item, idx) => (
               <Card key={idx} className="bg-card/40 border-white/10 hover:bg-card/60 transition-colors">
                 <CardHeader>
                   <CardTitle className="flex justify-between items-center text-lg">
                     {item.method}
                     <Badge className={
                       item.difficulty === "Easy" ? "bg-green-500/20 text-green-400" : 
                       item.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" : 
                       "bg-red-500/20 text-red-400"
                     }>{item.difficulty}</Badge>
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold text-foreground mb-1">{item.estimatedMonthly}</div>
                   <p className="text-sm text-muted-foreground">Estimated monthly revenue potential once established.</p>
                 </CardContent>
               </Card>
             ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function KpiCard({ title, value, subtext, icon, color }: any) {
  return (
    <Card className="bg-card/40 backdrop-blur border-white/10 hover:border-primary/30 transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className={`p-2 rounded-lg bg-${color}-500/10`}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-xs text-muted-foreground">{subtext}</div>
      </CardContent>
    </Card>
  );
}
