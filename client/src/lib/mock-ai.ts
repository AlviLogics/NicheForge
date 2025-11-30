import { Brain, TrendingUp, DollarSign, Users, Video, Target, Zap, PenTool } from "lucide-react";

export interface NicheData {
  niche: string;
  analysis: {
    competition: "Low" | "Medium" | "High";
    competitionScore: number; // 1-100
    demand: "Low" | "Medium" | "High";
    demandScore: number; // 1-100
    cpm: string;
    topKeywords: string[];
    demographics: string;
  };
  strategy: {
    branding: string;
    tone: string;
    uploadSchedule: string;
    contentPillars: Array<{ title: string; description: string }>;
  };
  viralIdeas: Array<{
    title: string;
    thumbnailConfig: string;
    hook: string;
    viralScore: number; // 1-100
  }>;
  monetization: Array<{
    method: string;
    estimatedMonthly: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }>;
  sampleScript: {
    title: string;
    sections: Array<{ time: string; speaker: string; visuals: string }>;
  };
}

export const generateNicheStrategy = async (niche: string): Promise<NicheData> => {
  // Simulate AI delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const normalizedNiche = niche.toLowerCase();
  
  // Deterministic-ish randomization based on string length
  const seed = niche.length;
  
  return {
    niche,
    analysis: {
      competition: seed % 3 === 0 ? "High" : seed % 3 === 1 ? "Medium" : "Low",
      competitionScore: 40 + (seed * 3) % 50,
      demand: "High",
      demandScore: 75 + (seed * 2) % 25,
      cpm: `$${(5 + (seed % 20)).toFixed(2)} - $${(15 + (seed % 30)).toFixed(2)}`,
      topKeywords: [
        `${niche} for beginners`,
        `best ${niche} 2025`,
        `how to start ${niche}`,
        `${niche} mistakes`,
        `${niche} tutorial`,
        `advanced ${niche} tips`
      ],
      demographics: "Males & Females, 18-35, Tech-savvy, Interested in self-improvement"
    },
    strategy: {
      branding: "Modern, clean, authoritative but accessible.",
      tone: "Energetic, informative, and fast-paced.",
      uploadSchedule: "2x per week (Tuesday & Friday at 10am EST)",
      contentPillars: [
        { title: "Educational/How-To", description: "Solve specific problems your audience faces." },
        { title: "Trend Analysis", description: "Cover breaking news or trends in the " + niche + " space." },
        { title: "Case Studies", description: "Show real examples of success/failure in " + niche + "." },
      ]
    },
    viralIdeas: [
      {
        title: `I Tried ${niche} for 30 Days (Here's What Happened)`,
        thumbnailConfig: "Split screen: Day 1 vs Day 30. Shocked face. Red arrow pointing to result.",
        hook: "Is it actually possible to master " + niche + " in just 30 days? I put it to the test so you don't have to.",
        viralScore: 94
      },
      {
        title: `Stop Doing This in ${niche} (You're Losing Money)`,
        thumbnailConfig: "Person holding head in hands. Big red 'X' over a common object related to " + niche + ".",
        hook: "99% of beginners make this fatal mistake with " + niche + ". Here is how to fix it instantly.",
        viralScore: 88
      },
      {
        title: `The Ultimate ${niche} Guide for 2025`,
        thumbnailConfig: "Futuristic background. Bold text '2025 GUIDE'. Glowing object related to " + niche + ".",
        hook: "Everything you knew about " + niche + " is changing in 2025. Here is the new blueprint.",
        viralScore: 91
      },
      {
        title: `10 ${niche} Hacks That Feel Illegal to Know`,
        thumbnailConfig: "Dark background. Silhouette of a person. Text 'SECRET HACKS'.",
        hook: "These secrets are used by the top 1% of experts in " + niche + ". Today I'm exposing them.",
        viralScore: 97
      },
      {
        title: `Why Everyone is Quitting ${niche}`,
        thumbnailConfig: "Sad face. Chart going down. Text 'IT'S OVER?'.",
        hook: "Is " + niche + " actually dead? The data might surprise you.",
        viralScore: 85
      }
    ],
    monetization: [
      { method: "AdSense", estimatedMonthly: "$500 - $2,000", difficulty: "Easy" },
      { method: "Affiliate Marketing", estimatedMonthly: "$1,000 - $5,000", difficulty: "Medium" },
      { method: "Digital Course/Guide", estimatedMonthly: "$3,000+", difficulty: "Hard" },
      { method: "Sponsorships", estimatedMonthly: "$1,500 - $4,000", difficulty: "Medium" }
    ],
    sampleScript: {
      title: `I Tried ${niche} for 30 Days`,
      sections: [
        { time: "0:00 - 0:45", speaker: "Host", visuals: "Fast montage of the 30-day journey. Hook sentence spoken directly to camera." },
        { time: "0:45 - 2:00", speaker: "Host", visuals: "Day 1 footage. Looking confused. Explaining the initial goal." },
        { time: "2:00 - 5:00", speaker: "Host", visuals: "Montage of Week 1-2. Showing struggles and first small wins. Screen recordings of the process." },
        { time: "5:00 - 7:30", speaker: "Host", visuals: "The 'Breakthrough' moment. Upbeat music. Fast paced editing." },
        { time: "7:30 - 9:00", speaker: "Host", visuals: "Day 30 results. Comparison with Day 1. Final verdict." },
        { time: "9:00 - 9:45", speaker: "Host", visuals: "Call to action. Subscribe animation. End screen." }
      ]
    }
  };
};
