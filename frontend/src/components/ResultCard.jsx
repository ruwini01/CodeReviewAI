import { AlertCircle, CheckCircle2, Info, Code2, FileText, Wrench, BookOpen } from "lucide-react";
import TypingCodeDisplay from "./TypingCodeDisplay";
import MarkdownRenderer from "./MarkdownRenderer";

// Helper function to clean code blocks (remove markdown syntax)
const cleanCodeBlock = (code) => {
  if (!code) return '';
  
  // Remove markdown code block syntax
  let cleaned = code.trim();
  
  // Remove opening ```language
  cleaned = cleaned.replace(/^```[\w]*\n?/g, '');
  
  // Remove closing ```
  cleaned = cleaned.replace(/\n?```$/g, '');
  
  return cleaned.trim();
};

const getSeverityIcon = (severity) => {
  switch (severity) {
    case 'error':
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-warning" />;
    case 'info':
      return <Info className="w-4 h-4 text-primary" />;
    default:
      return <Info className="w-4 h-4 text-primary" />;
  }
};

const getSeverityClass = (severity) => {
  switch (severity) {
    case 'error':
      return 'border-destructive/30 bg-destructive/5';
    case 'warning':
      return 'border-warning/30 bg-warning/5';
    case 'info':
      return 'border-primary/30 bg-primary/5';
    default:
      return 'border-primary/30 bg-primary/5';
  }
};

const ResultCard = ({ result, fixedCode, isFixing, language }) => {
  // Add null checks
  if (!result) return null;

  const hasErrors = result?.issues?.some(issue => 
    issue?.severity?.toLowerCase() === 'error'
  ) || false;

  const issues = result?.issues || [];
  const summary = result?.summary || result?.analysis || 'Code analysis complete.';
  const issueCount = issues.length;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Summary Section */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${issueCount > 0 ? 'bg-warning/10' : 'bg-success/10'}`}>
            <CheckCircle2 className={`w-5 h-5 ${issueCount > 0 ? 'text-warning' : 'text-success'}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Analysis Summary
              {issueCount > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({issueCount} issue{issueCount !== 1 ? 's' : ''} found)
                </span>
              )}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {issueCount === 0 
                ? "No critical issues found in your code. Great job!" 
                : `Found ${issueCount} issue${issueCount !== 1 ? 's' : ''} that need attention.`}
            </p>
          </div>
        </div>
      </div>

      {/* Issues Section */}
      {issues.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Issues Found ({issues.length})
            </h3>
          </div>
          
          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getSeverityClass(issue?.severity)} transition-colors`}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(issue?.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {issue?.line && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          Line {issue.line}
                        </span>
                      )}
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        {issue?.severity || 'info'}
                      </span>
                    </div>
                    <p className="text-foreground">{issue?.message || 'No message provided'}</p>
                    {issue?.suggestion && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Suggestion:</span> {issue.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Analysis Section with Markdown Rendering */}
      {result?.analysis && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Detailed Analysis</h3>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={result.analysis} />
          </div>
        </div>
      )}

      {/* Fixing in Progress */}
      {(hasErrors && isFixing) && (
        <div className="glass-card p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wrench className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Fixing Code...</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI is generating a corrected version of your code
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Code Section with Typing Animation */}
      {(hasErrors && fixedCode && !isFixing) && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Fixed Code</h3>
            <span className="text-xs px-2 py-0.5 rounded-lg bg-success/10 text-success font-medium">
              AI-Corrected
            </span>
          </div>
          
          <TypingCodeDisplay 
            code={cleanCodeBlock(fixedCode?.fixed_code || fixedCode)} 
            language={language || 'javascript'} 
          />
        </div>
      )}

      {/* Original Fixed Code Section (if no errors but fixed code exists) */}
      {(!hasErrors && result?.fixedCode) && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Optimized Code</h3>
          </div>
          
          <div className="code-block scrollbar-thin">
            <pre className="text-foreground">
              <code>{result.fixedCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;