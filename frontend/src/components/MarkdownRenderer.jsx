import React from 'react';

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  // Function to parse markdown-style text into React elements
  const parseMarkdown = (text) => {
    const elements = [];
    const lines = text.split('\n');
    let currentIndex = 0;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeBlockLanguage = line.trim().replace('```', '');
          codeBlockContent = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            <div key={currentIndex++} className="my-4 rounded-lg overflow-hidden border border-border">
              <div className="bg-muted px-3 py-1 text-xs font-mono text-muted-foreground border-b border-border">
                {codeBlockLanguage || 'code'}
              </div>
              <pre className="bg-secondary/50 p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">
                  {codeBlockContent.join('\n')}
                </code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={currentIndex++} className="text-lg font-semibold text-foreground mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={currentIndex++} className="text-xl font-bold text-foreground mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={currentIndex++} className="text-2xl font-bold text-foreground mt-6 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
        continue;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={currentIndex++} className="ml-6 mb-2 text-foreground">
            {parseInlineMarkdown(content)}
          </li>
        );
        continue;
      }

      // Handle bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().replace(/^[-*]\s/, '');
        elements.push(
          <li key={currentIndex++} className="ml-6 mb-2 text-foreground list-disc">
            {parseInlineMarkdown(content)}
          </li>
        );
        continue;
      }

      // Handle empty lines
      if (line.trim() === '') {
        elements.push(<div key={currentIndex++} className="h-2" />);
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={currentIndex++} className="mb-3 text-muted-foreground leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>
      );
    }

    return elements;
  };

  // Parse inline markdown (bold, italic, inline code)
  const parseInlineMarkdown = (text) => {
    const parts = [];
    let currentText = text;
    let key = 0;

    // Regular expression patterns
    const patterns = [
      { regex: /\*\*([^*]+)\*\*/g, tag: 'bold' },
      { regex: /\*([^*]+)\*/g, tag: 'italic' },
      { regex: /`([^`]+)`/g, tag: 'code' },
    ];

    // Process each pattern
    while (currentText.length > 0) {
      let earliestMatch = null;
      let earliestPattern = null;

      // Find the earliest match among all patterns
      patterns.forEach(pattern => {
        pattern.regex.lastIndex = 0;
        const match = pattern.regex.exec(currentText);
        if (match && (!earliestMatch || match.index < earliestMatch.index)) {
          earliestMatch = match;
          earliestPattern = pattern;
        }
      });

      if (!earliestMatch) {
        // No more matches, add remaining text
        parts.push(<span key={key++}>{currentText}</span>);
        break;
      }

      // Add text before the match
      if (earliestMatch.index > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, earliestMatch.index)}</span>);
      }

      // Add the formatted match
      const content = earliestMatch[1];
      if (earliestPattern.tag === 'bold') {
        parts.push(<strong key={key++} className="font-semibold text-foreground">{content}</strong>);
      } else if (earliestPattern.tag === 'italic') {
        parts.push(<em key={key++} className="italic">{content}</em>);
      } else if (earliestPattern.tag === 'code') {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-sm">
            {content}
          </code>
        );
      }

      // Continue with remaining text
      currentText = currentText.substring(earliestMatch.index + earliestMatch[0].length);
    }

    return parts;
  };

  return (
    <div className="markdown-content space-y-2">
      {parseMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;