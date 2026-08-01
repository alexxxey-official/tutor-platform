'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Helper to render plain text containing simple markdown formatting like **bold**
 */
function renderFormattedText(text) {
  if (!text) return null;

  // Split lines
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Parse **bold** inside line
    const boldParts = [];
    let lastIdx = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        boldParts.push(line.slice(lastIdx, match.index));
      }
      boldParts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {match[1]}
        </strong>
      );
      lastIdx = boldRegex.lastIndex;
    }

    if (lastIdx < line.length) {
      boldParts.push(line.slice(lastIdx));
    }

    return (
      <React.Fragment key={lineIdx}>
        {boldParts}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

/**
 * MathText renders text containing LaTeX formulas using KaTeX.
 * - Inline formulas: $E = mc^2$
 * - Display/Block formulas: $$ \int_{0}^{\infty} x^2 dx $$
 */
export default function MathText({ text = '', className = '', inline = false }) {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    if (inline) {
      try {
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(text, { throwOnError: false, displayMode: false }),
            }}
          />
        );
      } catch (err) {
        return <span>{text}</span>;
      }
    }

    // Split text by block formulas ($$...$$) and inline formulas ($...$)
    const parts = [];
    let lastIndex = 0;
    const regex = /(\$\$(.*?)\$\$|\$(.*?)\$)/gs;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }

      if (match[2] !== undefined) {
        parts.push({
          type: 'block-math',
          content: match[2],
        });
      } else if (match[3] !== undefined) {
        parts.push({
          type: 'inline-math',
          content: match[3],
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex),
      });
    }

    return parts.map((part, idx) => {
      if (part.type === 'text') {
        return <React.Fragment key={idx}>{renderFormattedText(part.content)}</React.Fragment>;
      }

      try {
        const isDisplay = part.type === 'block-math';
        const html = katex.renderToString(part.content.trim(), {
          throwOnError: false,
          displayMode: isDisplay,
        });

        if (isDisplay) {
          return (
            <div
              key={idx}
              className="my-4 text-center overflow-x-auto py-1.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block px-0.5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (e) {
        return <code key={idx} className="text-red-500">{part.content}</code>;
      }
    });
  }, [text, inline]);

  return <div className={`math-text leading-relaxed ${className}`}>{renderedContent}</div>;
}
