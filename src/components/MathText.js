'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * MathText renders text containing LaTeX formulas using KaTeX.
 * - Inline formulas: $E = mc^2$
 * - Display/Block formulas: $$ \int_{0}^{\infty} x^2 dx $$
 */
export default function MathText({ text = '', className = '', inline = false }) {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // If whole string is meant to be inline formula without delimiters
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
        const lines = part.content.split('\n');
        return (
          <React.Fragment key={idx}>
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {line}
                {lineIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      }

      try {
        const isDisplay = part.type === 'block-math';
        const html = katex.renderToString(part.content, {
          throwOnError: false,
          displayMode: isDisplay,
        });

        if (isDisplay) {
          return (
            <div
              key={idx}
              className="my-3 overflow-x-auto text-center py-2 bg-slate-50/70 rounded-lg border border-slate-100"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block px-1 font-sans"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (e) {
        return <code key={idx} className="text-red-500">{part.content}</code>;
      }
    });
  }, [text, inline]);

  return <div className={`math-text ${className}`}>{renderedContent}</div>;
}
