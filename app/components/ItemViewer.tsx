"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Section, Category, Item } from "../types";
import { CopyIcon, CheckIcon, SlidersIcon, ChevronDownIcon, getIconByName } from "./Icons";

interface ItemViewerProps {
  item: Item;
  category: Category;
  section: Section;
}

const VAR_REGEX = /\{\{([A-Z][A-Z0-9_]*)\}\}/g;

function extractVars(content: string): string[] {
  return [...new Set([...content.matchAll(VAR_REGEX)].map((m) => m[1]))];
}

function formatVarLabel(name: string): string {
  return name.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function processContent(content: string, values: Record<string, string>): string {
  return content.replace(VAR_REGEX, (_, name) => {
    const val = values[name];
    return val ? `**${val}**` : `\`{{${name}}}\``;
  });
}

export default function ItemViewer({ item, category, section }: ItemViewerProps) {
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [varsOpen, setVarsOpen] = useState(true);

  const content = item.content ?? "";
  const vars = useMemo(() => extractVars(content), [content]);
  const filledCount = vars.filter((v) => values[v]).length;
  const processed = useMemo(() => processContent(content, values), [content, values]);

  const handleCopy = async () => {
    const final = content.replace(VAR_REGEX, (_, name) => values[name] ?? `{{${name}}}`);
    await navigator.clipboard.writeText(final);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CategoryIcon = getIconByName(category.icon);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[--bg]">
      {/* ── Header ─────────────────────────────── */}
      <div className="flex-none border-b border-[--border]">
        {/* Coloured accent bar */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${category.color}, ${section.color})` }} />

        <div className="px-7 pt-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              {/* Icon */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
                style={{ background: `${category.color}15`, border: `1px solid ${category.color}25` }}
              >
                <span style={{ color: category.color }}>
                  <CategoryIcon className="w-5 h-5" />
                </span>
              </div>

              <div className="min-w-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: section.color }}>
                    {section.name}
                  </span>
                  <span className="text-[--text-muted] text-xs">/</span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[--text-muted]">
                    {category.name}
                  </span>
                </div>

                <h1 className="text-xl font-bold text-[--text-primary] leading-snug">{item.title}</h1>
                <p className="mt-1 text-sm text-[--text-secondary] leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 border ${
                copied
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-[--bg-elevated] text-[--text-secondary] border-[--border] hover:text-[--text-primary] hover:border-[--border-hover]"
              }`}
            >
              {copied ? <><CheckIcon className="w-4 h-4" />Copied!</> : <><CopyIcon className="w-4 h-4" />Copy</>}
            </button>
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 ml-13">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ background: `${category.color}12`, border: `1px solid ${category.color}25`, color: category.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Variables panel ─────────────────────── */}
      {vars.length > 0 && (
        <div
          className="flex-none border-b border-[--border] bg-[--bg-sidebar]"
        >
          <button
            onClick={() => setVarsOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-7 py-3 text-left hover:bg-[--bg-elevated] transition-colors"
          >
            <SlidersIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Variables</span>
            <span className="ml-1 text-[11px] text-[--text-muted]">
              {filledCount}/{vars.length} filled
            </span>
            {filledCount > 0 && (
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
            <ChevronDownIcon
              className={`w-3.5 h-3.5 text-[--text-muted] ml-auto transition-transform duration-200 ${varsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {varsOpen && (
            <div className="px-7 pb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {vars.map((name) => (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[--text-muted]">
                    {formatVarLabel(name)}
                  </label>
                  <input
                    type="text"
                    value={values[name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
                    placeholder={`Enter ${formatVarLabel(name).toLowerCase()}…`}
                    className="w-full bg-[--bg] border border-[--border] rounded-lg px-3 py-1.5 text-xs
                      text-[--text-primary] placeholder-[--text-muted] outline-none
                      focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Content ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-7 py-6 max-w-3xl">
          <div className="prose prose-sm max-w-none
            dark:prose-invert
            prose-headings:font-semibold
            prose-headings:text-[--text-primary]
            prose-h1:text-xl prose-h1:mt-0 prose-h1:mb-4
            prose-h2:text-base prose-h2:mt-8 prose-h2:mb-3 prose-h2:pt-4 prose-h2:border-t prose-h2:border-[--border]
            prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2
            prose-p:text-[--text-secondary] prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-[--text-secondary] prose-li:leading-relaxed prose-li:text-sm
            prose-strong:text-[--text-primary] prose-strong:font-semibold
            prose-em:text-[--text-secondary]
            prose-code:font-mono prose-code:text-[13px] prose-code:font-normal
            prose-code:text-amber-400 prose-code:bg-amber-400/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
            prose-pre:bg-[--bg-elevated] prose-pre:border prose-pre:border-[--border] prose-pre:rounded-xl prose-pre:p-5
            prose-pre:text-[--text-secondary]
            prose-blockquote:border-l-2 prose-blockquote:border-[--border-hover] prose-blockquote:text-[--text-muted] prose-blockquote:not-italic prose-blockquote:pl-4
            prose-a:no-underline hover:prose-a:underline
            prose-hr:border-[--border]
            prose-table:text-sm
            prose-th:text-[--text-primary] prose-th:font-semibold prose-th:border prose-th:border-[--border] prose-th:px-3 prose-th:py-2 prose-th:bg-[--bg-elevated]
            prose-td:text-[--text-secondary] prose-td:border prose-td:border-[--border] prose-td:px-3 prose-td:py-2
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a href={href} style={{ color: category.color }}>{children}</a>
                ),
              }}
            >
              {processed}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
