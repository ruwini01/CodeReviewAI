import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];

const CodeInput = ({ onSubmit, isLoading }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() && !isLoading) {
      onSubmit(code, language);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Code Input</h2>
          <p className="text-sm text-muted-foreground">Paste your code below for AI analysis</p>
        </div>
        
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full sm:w-40 bg-secondary border-border/50 text-foreground">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {LANGUAGES.map((lang) => (
              <SelectItem 
                key={lang.value} 
                value={lang.value}
                className="text-foreground hover:bg-secondary focus:bg-secondary"
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste your ${LANGUAGES.find(l => l.value === language)?.label || ''} code here...\n\nfunction example() {\n  // Your code will be analyzed for:\n  // • Bugs and potential errors\n  // • Code style improvements\n  // • Performance optimizations\n}`}
          className="w-full h-64 sm:h-80 p-4 bg-code-bg border border-code-border rounded-lg font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none scrollbar-thin transition-all"
          spellCheck={false}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {code.length} characters
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!code.trim() || isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 transition-all hover:gap-3"
        >
          <span>Analyze Code</span>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default CodeInput;