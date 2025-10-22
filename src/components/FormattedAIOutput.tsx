import React from 'react';

interface FormattedAIOutputProps {
  content: string;
  className?: string;
}

const FormattedAIOutput: React.FC<FormattedAIOutputProps> = ({ content, className = '' }) => {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    const formatted: JSX.Element[] = [];
    let currentList: string[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        const ListTag = currentListType === 'ol' ? 'ol' : 'ul';
        formatted.push(
          <ListTag key={formatted.length} className={currentListType === 'ol' ? 'list-decimal list-inside space-y-2 my-4 ml-4' : 'list-disc list-inside space-y-2 my-4 ml-4'}>
            {currentList.map((item, idx) => (
              <li key={idx} className="text-foreground/90 leading-relaxed pl-2">
                {formatInlineText(item)}
              </li>
            ))}
          </ListTag>
        );
        currentList = [];
        currentListType = null;
      }
    };

    const formatInlineText = (text: string) => {
      // Bold with **text**
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
      // Italic with *text*
      text = text.replace(/\*(.+?)\*/g, '<em class="italic text-foreground/80">$1</em>');
      // Code with `text`
      text = text.replace(/`(.+?)`/g, '<code class="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Code blocks
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          formatted.push(
            <pre key={formatted.length} className="bg-secondary/50 p-4 rounded-lg my-4 overflow-x-auto border border-primary/10">
              <code className="text-sm font-mono text-foreground">{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Headings
      if (trimmedLine.startsWith('# ')) {
        flushList();
        formatted.push(
          <h1 key={formatted.length} className="text-3xl font-bold mt-6 mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {trimmedLine.slice(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        flushList();
        formatted.push(
          <h2 key={formatted.length} className="text-2xl font-bold mt-5 mb-3 text-primary">
            {trimmedLine.slice(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushList();
        formatted.push(
          <h3 key={formatted.length} className="text-xl font-semibold mt-4 mb-2 text-purple-600 dark:text-purple-400">
            {trimmedLine.slice(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        flushList();
        formatted.push(
          <h4 key={formatted.length} className="text-lg font-semibold mt-3 mb-2 text-foreground">
            {trimmedLine.slice(5)}
          </h4>
        );
      }
      // Ordered list
      else if (/^\d+\.\s/.test(trimmedLine)) {
        if (currentListType !== 'ol') {
          flushList();
          currentListType = 'ol';
        }
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
      }
      // Unordered list (-, *, +)
      else if (/^[-*+]\s/.test(trimmedLine)) {
        if (currentListType !== 'ul') {
          flushList();
          currentListType = 'ul';
        }
        currentList.push(trimmedLine.replace(/^[-*+]\s/, ''));
      }
      // Horizontal rule
      else if (trimmedLine.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
        flushList();
        formatted.push(
          <hr key={formatted.length} className="my-6 border-primary/20" />
        );
      }
      // Blockquote
      else if (trimmedLine.startsWith('> ')) {
        flushList();
        formatted.push(
          <blockquote key={formatted.length} className="border-l-4 border-primary pl-4 py-2 my-4 italic text-foreground/80 bg-primary/5">
            {formatInlineText(trimmedLine.slice(2))}
          </blockquote>
        );
      }
      // Regular paragraph
      else if (trimmedLine.length > 0) {
        if (currentList.length > 0) {
          // Continue adding to current list if it's indented content
          if (line.startsWith('  ') || line.startsWith('\t')) {
            currentList[currentList.length - 1] += ' ' + trimmedLine;
          } else {
            flushList();
            formatted.push(
              <p key={formatted.length} className="my-3 leading-relaxed text-foreground/90">
                {formatInlineText(trimmedLine)}
              </p>
            );
          }
        } else {
          formatted.push(
            <p key={formatted.length} className="my-3 leading-relaxed text-foreground/90">
              {formatInlineText(trimmedLine)}
            </p>
          );
        }
      } else {
        flushList();
        if (formatted.length > 0 && trimmedLine === '') {
          formatted.push(<div key={formatted.length} className="h-2" />);
        }
      }
    });

    flushList();
    return formatted;
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {formatContent(content)}
    </div>
  );
};

export default FormattedAIOutput;
