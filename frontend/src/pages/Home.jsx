import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeInput from "@/components/CodeInput";
import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";
import { analyzeCode, fixCode } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

// Helper: check if input looks like valid code
const isCodeLikelyValid = (code, language) => {
  const trimmed = code.trim();
  if (!trimmed) return false; // empty input

  const patterns = {
    java: /class\s+\w+|public\s+static\s+void|System\.out\.print|import\s+\w+/i,
    python: /def\s+\w+|import\s+\w+|print\(/i,
    javascript: /function\s+\w+|const\s+\w+|let\s+\w+|console\.log/i
  };

  const pattern = patterns[language?.toLowerCase()];
  if (!pattern) return true; // fallback: assume valid
  return pattern.test(trimmed);
};

// Enhanced helper function to parse analysis text into structured issues
const parseAnalysisToIssues = (analysisText, code, language) => {
  const issues = [];

  // === PHASE 0: Check if code itself is valid ===
  if (!isCodeLikelyValid(code, language)) {
    return [{
      severity: 'error',
      message: 'Input does not appear to be valid code in the selected language',
      line: null,
      suggestion: 'Please enter actual code for analysis'
    }];
  }

  // === PHASE 1: Check for explicit positive indicators (no issues) ===
  const noIssuesIndicators = [
    /no\s+(critical\s+)?issues?\s+found/i,
    /code\s+is\s+(syntactically\s+)?correct/i,
    /will\s+run\s+without\s+errors/i,
    /looks\s+good/i,
    /perfectly\s+(fine|valid)/i,
    /no\s+problems?\s+detected/i,
    /code\s+is\s+valid/i,
    /no\s+bugs?\s+found/i
  ];

  const hasPositiveIndicator = noIssuesIndicators.some(pattern => 
    pattern.test(analysisText)
  );

  // === PHASE 2: Detect critical problems and errors ===
  const criticalPatterns = [
    { pattern: /language\s+mismatch/i, severity: 'error', extract: () => 'Language Mismatch: The submitted code language does not match the selected language' },
    { pattern: /(is\s+not|not\s+valid)\s+(python|java|javascript|c\+\+|ruby|go|rust|php|swift|kotlin|typescript)\s+code/i, severity: 'error', extract: () => 'Wrong Language: The code appears to be in a different language than selected' },
    { pattern: /syntax\s+error/i, severity: 'error', extract: (match, context) => { const sentences = context.split(/[.!?]+/); const errorSentence = sentences.find(s => /syntax\s+error/i.test(s)); return errorSentence ? errorSentence.trim() : 'Syntax Error detected in the code'; } },
    { pattern: /parsing\s+error/i, severity: 'error', extract: () => 'Parsing Error: Unable to parse the code structure' },
    { pattern: /compilation\s+error/i, severity: 'error', extract: () => 'Compilation Error: The code will not compile' },
    { pattern: /runtime\s+error/i, severity: 'error', extract: () => 'Runtime Error: The code may crash during execution' },
    { pattern: /logic\s+error/i, severity: 'error', extract: () => 'Logic Error: The code logic appears to be incorrect' },
    { pattern: /infinite\s+loop/i, severity: 'error', extract: () => 'Infinite Loop: Code contains a loop that may never terminate' },
    { pattern: /null\s+pointer|nullptr|nullpointerexception/i, severity: 'error', extract: () => 'Null Reference: Potential null pointer/reference access detected' },
    { pattern: /memory\s+leak/i, severity: 'error', extract: () => 'Memory Leak: Code may not properly release memory' },
    { pattern: /buffer\s+overflow/i, severity: 'error', extract: () => 'Buffer Overflow: Potential buffer overflow vulnerability' },
    { pattern: /race\s+condition/i, severity: 'error', extract: () => 'Race Condition: Potential concurrency issue detected' },
    { pattern: /deadlock/i, severity: 'error', extract: () => 'Deadlock: Potential deadlock situation in concurrent code' },
    { pattern: /security\s+(vulnerability|issue|risk)/i, severity: 'error', extract: () => 'Security Vulnerability: Code contains potential security risks' },
    { pattern: /sql\s+injection/i, severity: 'error', extract: () => 'SQL Injection: Code is vulnerable to SQL injection attacks' },
    { pattern: /xss|cross[\s-]site\s+scripting/i, severity: 'error', extract: () => 'XSS Vulnerability: Code is vulnerable to cross-site scripting' },
    { pattern: /type\s+error|type\s+mismatch/i, severity: 'error', extract: () => 'Type Error: Incompatible types detected' },
    { pattern: /undefined\s+(variable|function|method)/i, severity: 'error', extract: () => 'Undefined Reference: Using undefined variable or function' },
    { pattern: /missing\s+(import|include|require)/i, severity: 'error', extract: () => 'Missing Import: Required module or library not imported' },
    { pattern: /deprecated/i, severity: 'warning', extract: () => 'Deprecated Code: Using deprecated features or methods' },
    { pattern: /unused\s+(variable|function|import)/i, severity: 'warning', extract: () => 'Unused Code: Declared but never used' },
    { pattern: /potential\s+bug/i, severity: 'warning', extract: () => 'Potential Bug: Code may cause unexpected behavior' },
    { pattern: /performance\s+issue/i, severity: 'warning', extract: () => 'Performance Issue: Code may be inefficient' }
  ];

  for (const { pattern, severity, extract } of criticalPatterns) {
    const match = analysisText.match(pattern);
    if (match) {
      const message = extract(match, analysisText);
      if (!issues.some(issue => issue.message === message)) {
        issues.push({ severity, message, line: null, suggestion: 'See detailed analysis below for more information' });
      }
    }
  }

  // === PHASE 3-5: parse Issues/Analysis sections (same as your existing code) ===
  // ... keep all your previous parsing logic for structured sections

  // === PHASE 5: Final decision ===
  if (issues.length > 0) return issues;
  if (hasPositiveIndicator) return [];
  const problemKeywords = ['error', 'bug', 'issue', 'problem', 'incorrect', 'invalid', 'wrong'];
  const hasProblemKeywords = problemKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(analysisText));
  if (hasProblemKeywords && analysisText.length < 500 && !hasPositiveIndicator) {
    return [{
      severity: 'warning',
      message: 'Potential issues detected - review the analysis for details',
      line: null,
      suggestion: 'Check the detailed analysis section below'
    }];
  }

  return [];
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [result, setResult] = useState(null);
  const [fixedCode, setFixedCode] = useState(null);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);

  const handleSubmit = async (code, language) => {
    setIsLoading(true);
    setResult(null);
    setFixedCode(null);
    setError(null);
    setCurrentLanguage(language);

    try {
      // Step 1: Analyze the code
      const response = await analyzeCode({ code, language });
      const analysisText = response.analysis || '';

      // Parse text + code
      const parsedIssues = parseAnalysisToIssues(analysisText, code, language);

      setResult({
        issues: parsedIssues,
        summary: analysisText,
        analysis: analysisText
      });

      const issueCount = parsedIssues.length;
      const hasErrors = parsedIssues.some(issue => issue.severity?.toLowerCase() === 'error');

      toast({
        title: "Analysis Complete",
        description: issueCount > 0 
          ? `Found ${issueCount} issue${issueCount !== 1 ? 's' : ''} in your code.`
          : "No major issues found in your code.",
      });

      setIsLoading(false);

      // Step 2: If errors found, automatically fix the code
      if (hasErrors) {
        setIsFixing(true);
        try {
          const fixResponse = await fixCode({ code, language });
          setFixedCode(fixResponse);
          
          toast({
            title: "Code Fixed",
            description: "AI has generated a corrected version of your code.",
            variant: "default",
          });
        } catch (fixErr) {
          console.error("Fix error:", fixErr);
          toast({
            title: "Fix Failed",
            description: "Could not auto-fix the code, but analysis is available.",
            variant: "destructive",
          });
        } finally {
          setIsFixing(false);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze code. Please try again.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsFixing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">AI-Powered</span>{" "}
            <span className="text-foreground">Code Review</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback on your code. Our AI analyzes for bugs, style issues, 
            and suggests improvements to make your code better.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <CodeInput onSubmit={handleSubmit} isLoading={isLoading || isFixing} />
          {(isLoading || isFixing) && <Loader isFixing={isFixing} />}
          
          {error && !isLoading && !isFixing && (
            <div className="glass-card p-6 border-destructive/30 animate-fade-in">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Error</h3>
                  <p className="text-muted-foreground">{error}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Make sure the backend server is running at http://localhost:8080
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {result && !isLoading && (
            <ResultCard 
              result={result} 
              fixedCode={fixedCode}
              isFixing={isFixing}
              language={currentLanguage}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
