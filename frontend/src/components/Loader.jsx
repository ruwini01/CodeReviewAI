import { Sparkles, Wrench } from "lucide-react";

const Loader = ({ isFixing = false }) => {
  return (
    <div className="glass-card p-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-cyan-400/20 pulse-glow">
            {isFixing ? (
              <Wrench className="w-8 h-8 text-primary animate-pulse" />
            ) : (
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            )}
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            {isFixing ? 'Fixing Your Code' : 'Analyzing Your Code'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFixing 
              ? 'Our AI is generating corrected code...' 
              : 'Our AI is reviewing your code for improvements...'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
          <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
          <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
        </div>
        
        <div className="w-full max-w-xs bg-secondary/50 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;