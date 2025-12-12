import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

const TypingCodeDisplay = ({ code, language }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!code) return;
    
    setDisplayedCode('');
    setIsTypingComplete(false);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 10); // Adjust typing speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [code]);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) {
    return <div className="text-muted-foreground">No code to display</div>;
  }

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <span className="text-xs px-2 py-1 rounded-lg bg-secondary text-muted-foreground font-mono">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-success" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="code-block scrollbar-thin pt-12">
        <pre className="text-foreground">
          <code>
            {displayedCode}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default TypingCodeDisplay;