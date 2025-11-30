import { Link, useLocation } from "wouter";
import { Video, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Examples", href: "/#examples" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(255,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] transition-all">
              <Video className="w-5 h-5 fill-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Niche<span className="text-primary">Gen</span></span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </a>
          </Link>
          <Link href="/input">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_rgba(255,0,0,0.5)]">
              Start Creating
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-white/5 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground p-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="h-px bg-white/5 my-2" />
          <Link href="/login">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground p-2">
              Login
            </a>
          </Link>
          <Link href="/input">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Start Creating
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
