"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Section, Category, Item } from "../types";
import { CopyIcon, CheckIcon, SlidersIcon, ChevronDownIcon, EyeIcon, TerminalIcon, getIconByName } from "./Icons";

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

/** For preview: filled → **bold**, unfilled → `inline code` */
function processForPreview(content: string, values: Record<string, string>): string {
  return content.replace(VAR_REGEX, (_, name) =>
    values[name] ? `**${values[name]}**` : `\`{{${name}}}\``
  );
}

/** For markdown view: filled → direct value, unfilled → keep {{VAR}} */
function processForMarkdown(content: string, values: Record<string, string>): string {
  return content.replace(VAR_REGEX, (_, name) => values[name] || `{{${name}}}`);
}

function MarkdownLine({ line }: { line: string }) {
  let color = "var(--text-secondary)";
  let fontWeight = "normal";

  if      (/^#\s/.test(line))                              { color = "var(--syn-h1)";   fontWeight = "700"; }
  else if (/^##\s/.test(line))                             { color = "var(--syn-h2)";   fontWeight = "600"; }
  else if (/^###\s/.test(line))                            { color = "var(--syn-h3)";   fontWeight = "600"; }
  else if (/^```/.test(line))                              { color = "var(--syn-code)"; }
  else if (/^>\s/.test(line))                              { color = "var(--syn-quote)"; }
  else if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) { color = "var(--syn-list)"; }
  else if (/^\*\*/.test(line) || /^__/.test(line))        { color = "var(--syn-bold)"; }
  else if (/\{\{[A-Z_]+\}\}/.test(line))                  { color = "var(--syn-var)";  }

  return (
    <span style={{ color, fontWeight, whiteSpace: "pre-wrap" }}>
      {line || "\u00A0"}
    </span>
  );
}

type ViewMode = "markdown" | "preview";

export default function ItemViewer({ item, category, section }: ItemViewerProps) {
  const [copied, setCopied]     = useState(false);
  const [values, setValues]     = useState<Record<string, string>>({});
  const [varsOpen, setVarsOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("markdown");

  const content      = item.content ?? "";
  const vars         = useMemo(() => extractVars(content), [content]);
  const filledCount  = vars.filter((v) => values[v]).length;
  const forPreview   = useMemo(() => processForPreview(content, values),  [content, values]);
  const forMarkdown  = useMemo(() => processForMarkdown(content, values), [content, values]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(forMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CategoryIcon = getIconByName(category.icon);

  /* ── Custom markdown components for rich preview ── */
  const mdComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-2xl font-black mt-0 mb-5 pb-3 text-[--text-primary]"
        style={{ borderBottom: `2px solid ${category.color}40` }}>
        <span style={{ background: `linear-gradient(90deg, ${category.color}, ${section.color})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {children}
        </span>
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-bold mt-8 mb-3 pt-5 flex items-center gap-2.5 text-[--text-primary]"
        style={{ borderTop: `1px solid var(--border)` }}>
        <span className="w-1 h-4 rounded-full shrink-0" style={{ background: category.color }} />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold mt-5 mb-2 text-[--text-secondary] uppercase tracking-wider">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm leading-7 text-[--text-secondary] mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-3 space-y-1.5 pl-0 list-none">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-3 space-y-1.5 pl-0 list-none counter-reset-item">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2.5 text-sm text-[--text-secondary] leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 flex-none"
          style={{ background: category.color }} />
        <span>{children}</span>
      </li>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <code className="block text-[13px] font-mono text-amber-300 leading-relaxed">
            {children}
          </code>
        );
      }
      return (
        <code className="font-mono text-[12px] px-1.5 py-0.5 rounded-md"
          style={{ background: `${category.color}15`, color: category.color }}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="my-4 p-4 rounded-xl overflow-x-auto text-[13px] leading-relaxed border"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 pl-4 py-1 text-sm text-[--text-muted] italic rounded-r-lg"
        style={{ borderLeft: `3px solid ${category.color}60`, background: `${category.color}08` }}>
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold" style={{ color: category.color }}>{children}</strong>
    ),
    a: ({ href, children }) => (
      <a href={href} style={{ color: section.color }}
        className="underline underline-offset-2 hover:opacity-80 transition-opacity">
        {children}
      </a>
    ),
    hr: () => (
      <hr className="my-6 border-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)` }} />
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-xl border border-[--border]">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-semibold text-[--text-primary] text-xs uppercase tracking-wide"
        style={{ background: `${category.color}12`, borderBottom: "1px solid var(--border)" }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-[--text-secondary] border-b border-[--border]">{children}</td>
    ),
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[--bg]">
      {/* Accent line */}
      <div className="flex-none h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}, ${section.color}, transparent)` }}
      />

      {/* ── Header ──────────────────────────────── */}
      <div className="flex-none border-b border-[--border] px-7 pt-6 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${category.color}28, ${category.color}0a)`,
                border: `1px solid ${category.color}28`,
                boxShadow: `0 0 20px ${category.color}18`,
              }}>
              <span style={{ color: category.color }}>
                <CategoryIcon className="w-5 h-5" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: section.color }}>
                  {section.name}
                </span>
                <span className="text-[--text-muted] text-[10px]">/</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[--text-muted]">
                  {category.name}
                </span>
              </div>
              <h1 className="text-xl font-bold text-[--text-primary] leading-snug">{item.title}</h1>
              <p className="mt-1 text-sm text-[--text-secondary] leading-relaxed">{item.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sliding Markdown | Preview toggle */}
            <div className="relative flex p-1 rounded-xl border border-[--border]"
              style={{ background: "var(--bg-elevated)" }}>
              {/* Sliding indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-lg transition-all duration-200 ease-in-out"
                style={{
                  background: "var(--bg-sidebar)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
                  left:  viewMode === "markdown" ? "4px" : "calc(50% + 0px)",
                  width: "calc(50% - 4px)",
                }}
              />
              {([
                { mode: "markdown", Icon: TerminalIcon, label: "Markdown" },
                { mode: "preview",  Icon: EyeIcon,      label: "Preview"  },
              ] as { mode: ViewMode; Icon: React.FC<{className?: string}>; label: string }[]).map(({ mode, Icon, label }) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                    text-[11px] font-semibold transition-colors duration-150 ${
                    viewMode === mode
                      ? "text-[--text-primary]"
                      : "text-[--text-muted] hover:text-[--text-secondary]"
                  }`}>
                  <Icon className="w-3 h-3 shrink-0" />
                  {label}
                </button>
              ))}
            </div>

            {/* Copy button */}
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                transition-all duration-200 active:scale-95"
              style={copied ? {
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                boxShadow: "0 0 18px rgba(16,185,129,0.35)",
                transform: "scale(0.97)",
              } : {
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              {copied
                ? <><CheckIcon className="w-4 h-4" />Copied!</>
                : <><CopyIcon className="w-4 h-4" />Copy</>}
            </button>
          </div>
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pl-13">
            {item.tags.map((tag) => (
              <span key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold hover:scale-105 transition-transform cursor-default"
                style={{ background: `${category.color}14`, border: `1px solid ${category.color}28`, color: category.color }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Variables panel ─────────────────────── */}
      {vars.length > 0 && (
        <div className="flex-none border-b border-[--border]" style={{ background: "var(--bg-sidebar)" }}>
          <button onClick={() => setVarsOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-7 py-3 text-left hover:bg-[--bg-elevated] transition-colors">
            <SlidersIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Variables</span>
            <span className="ml-1.5 text-[11px] text-[--text-muted]">{filledCount}/{vars.length} filled</span>
            {filledCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            <ChevronDownIcon
              className={`w-3.5 h-3.5 text-[--text-muted] ml-auto transition-transform duration-200 ${varsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {varsOpen && (
            <div className="px-7 pb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-slide">
              {vars.map((name) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[--text-muted]">
                    {formatVarLabel(name)}
                  </label>
                  <input
                    type="text"
                    value={values[name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
                    placeholder={`${formatVarLabel(name)}…`}
                    className="w-full border border-[--border] rounded-lg px-3 py-1.5 text-xs
                      text-[--text-primary] placeholder-[--text-muted] outline-none transition-all
                      focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                    style={{ background: "var(--bg)", fontFamily: "var(--font-geist-mono, monospace)" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Content area ────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === "markdown" ? (
          /* ── Markdown view ── */
          <div key="markdown" className="animate-fade-slide p-6">
            <div className="rounded-xl border border-[--border] overflow-hidden"
              style={{ background: "var(--bg-elevated)" }}>
              {/* Fake window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[--border]"
                style={{ background: "var(--bg-sidebar)" }}>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-[11px] text-[--text-muted] ml-2"
                  style={{ fontFamily: "var(--font-geist-mono, monospace)" }}>
                  {section.id}/{category.id}/{item.id}.md
                </span>
                {filledCount > 0 && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: `${category.color}15`, color: category.color }}>
                    {filledCount} var{filledCount > 1 ? "s" : ""} substituted
                  </span>
                )}
              </div>
              <div className="p-5 overflow-auto" style={{ fontFamily: "var(--font-geist-mono, monospace)" }}>
                {forMarkdown.split("\n").map((line, i) => (
                  <div key={i} className="flex gap-4 leading-relaxed">
                    <span className="select-none text-right shrink-0 w-7"
                      style={{ color: "var(--text-muted)", fontSize: "11px", lineHeight: "1.75" }}>
                      {i + 1}
                    </span>
                    <MarkdownLine line={line} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Preview view ── */
          <div key="preview" className="animate-fade-slide p-4 lg:p-6">
            <div className="max-w-5xl mx-auto rounded-2xl border border-[--border] overflow-hidden shadow-xl"
              style={{ background: "var(--bg-sidebar)", boxShadow: `0 20px 60px ${category.color}0c` }}>
              {/* Document header band */}
              <div className="px-8 pt-7 pb-5"
                style={{ background: `linear-gradient(135deg, ${category.color}0a, ${section.color}06)`,
                  borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${section.color}18`, color: section.color }}>
                    {section.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${category.color}18`, color: category.color }}>
                    {category.name}
                  </span>
                  <span className="text-[10px] font-mono text-[--text-muted] ml-auto"
                    style={{ fontFamily: "var(--font-geist-mono, monospace)" }}>
                    {section.id}/{category.id}/{item.id}.md
                  </span>
                </div>
                <h2 className="text-xl font-black text-[--text-primary]">{item.title}</h2>
                <p className="text-sm text-[--text-secondary] mt-1 leading-relaxed">{item.description}</p>
              </div>

              {/* Document body */}
              <div className="px-8 py-7">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {forPreview}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
