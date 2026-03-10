"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Section, Category, Item } from "../types";
import { CopyIcon, CheckIcon, getIconByName } from "./Icons";

interface ItemViewerProps {
  item: Item;
  category: Category;
  section: Section;
}

export default function ItemViewer({ item, category, section }: ItemViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!item.content) return;
    await navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CategoryIcon = getIconByName(category.icon);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-none px-8 pt-8 pb-6 border-b border-zinc-800/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 mt-0.5"
              style={{ backgroundColor: `${category.color}18`, color: category.color }}
            >
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: section.color }}>
                  {section.name}
                </span>
                <span className="text-zinc-700 text-[11px]">/</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                  {category.name}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white leading-tight">{item.title}</h1>
              <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 border ${
              copied
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                : "bg-white/5 text-zinc-300 border-white/8 hover:bg-white/10 hover:text-white"
            }`}
          >
            {copied ? (
              <><CheckIcon className="w-4 h-4" /> Copied</>
            ) : (
              <><CopyIcon className="w-4 h-4" /> Copy</>
            )}
          </button>
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium border"
                style={{
                  backgroundColor: `${category.color}12`,
                  borderColor: `${category.color}28`,
                  color: category.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-h1:text-xl prose-h1:mt-0
          prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800
          prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-zinc-300 prose-p:leading-relaxed
          prose-li:text-zinc-300 prose-li:leading-relaxed
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-pink-400 prose-code:bg-pink-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:font-normal
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg prose-pre:p-4
          prose-blockquote:border-l-2 prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400 prose-blockquote:not-italic prose-blockquote:pl-4
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-hr:border-zinc-800
          prose-table:border-collapse
          prose-th:text-zinc-300 prose-th:font-semibold prose-th:border prose-th:border-zinc-800 prose-th:px-3 prose-th:py-2 prose-th:bg-zinc-900
          prose-td:text-zinc-400 prose-td:border prose-td:border-zinc-800 prose-td:px-3 prose-td:py-2
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.content ?? ""}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
