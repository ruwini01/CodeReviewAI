import { Code2, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative bg-gradient-to-br from-primary to-cyan-400 p-2 rounded-xl">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="gradient-text">CodeReview</span>
              <span className="text-foreground">AI</span>
            </h1>
            <p className="text-xs text-muted-foreground">Intelligent Code Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>Powered by AI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;