"use client";

import { useState, useCallback } from "react";
import { CopyIcon, CheckIcon } from "./Icons";
import { Category, Section } from "../types";

// ── Types ─────────────────────────────────────────────────────────────

export interface ReferenceData {
  type: "reference";
  intro?: string;
  sections: RefSection[];
}

export type RefSection =
  | { variant: "commands";  title: string; description?: string; items: CmdItem[] }
  | { variant: "shortcuts"; title: string; description?: string; items: ShortcutItem[] }
  | { variant: "code";      title: string; description?: string; language: string; code: string; note?: string }
  | { variant: "table";     title: string; description?: string; columns: string[]; rows: string[][] }
  | { variant: "tips";      title: string; description?: string; items: TipItem[] }
  | { variant: "cards";     title: string; description?: string; items: CardItem[] }
  | { variant: "text";      title?: string; content: string };

interface CmdItem    { cmd: string; desc: string; example?: string; badge?: string }
interface ShortcutItem { keys: string[]; action: string; note?: string }
interface TipItem    { title: string; body: string; type?: "info" | "warning" | "good" | "bad" }
interface CardItem   { title: string; subtitle?: string; body: string; badge?: string; badgeColor?: string }

// ── Small helpers ─────────────────────────────────────────────────────

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [text]);
  return { copied, copy };
}

function CopyBtn({ text, small }: { text: string; small?: boolean }) {
  const { copied, copy } = useCopy(text);
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1 rounded-md font-medium transition-all shrink-0
        ${small
          ? "p-1 opacity-0 group-hover:opacity-100 text-[--text-muted] hover:text-[--text-primary]"
          : "px-2.5 py-1 text-[11px] border border-[--border] text-[--text-muted] hover:border-[--border-hover] hover:text-[--text-primary]"
        }`}
      title="Copy"
    >
      {copied
        ? <CheckIcon className={small ? "w-3 h-3 text-emerald-400" : "w-3 h-3 text-emerald-400"} />
        : <CopyIcon  className={small ? "w-3 h-3" : "w-3 h-3"} />
      }
      {!small && <span>{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}

function KeyBadge({ k }: { k: string }) {
  return (
    <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 rounded
      text-[11px] font-mono font-semibold leading-none border
      text-[--text-primary] border-[--border-hover]"
      style={{ background: "var(--bg-elevated)", boxShadow: "0 1px 0 var(--border-hover)" }}>
      {k}
    </kbd>
  );
}

function SectionHeader({ title, description, color }: { title: string; description?: string; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color }} />
        <h3 className="text-[11px] font-black uppercase tracking-widest" style={{ color }}>
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-[13px] text-[--text-muted] leading-relaxed pl-4">{description}</p>
      )}
    </div>
  );
}

// ── Section renderers ─────────────────────────────────────────────────

function CommandsSection({ sec, color }: { sec: Extract<RefSection, { variant: "commands" }>; color: string }) {
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="rounded-xl border border-[--border]">
        {sec.items.map((item, i) => (
          <div key={i}
            className="group flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3
              px-4 py-3 border-b border-[--border] last:border-0 hover:bg-[--bg-elevated] transition-colors"
          >
            <div className="flex items-center gap-2 sm:shrink-0">
              <code
                className="text-[12px] font-mono font-semibold px-2 py-0.5 rounded-lg break-all"
                style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}
              >
                {item.cmd}
              </code>
              {item.badge && (
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={{ background: `${color}18`, color }}>
                  {item.badge}
                </span>
              )}
              <span className="sm:hidden ml-auto"><CopyBtn text={item.cmd} small /></span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[13px] text-[--text-secondary] leading-relaxed">{item.desc}</span>
              {item.example && (
                <div className="mt-1 flex items-start gap-1.5 min-w-0">
                  <span className="text-[11px] text-[--text-muted] shrink-0 mt-px">›</span>
                  <code className="text-[11px] font-mono text-[--text-muted] break-all">{item.example}</code>
                </div>
              )}
            </div>
            <span className="hidden sm:inline"><CopyBtn text={item.cmd} small /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShortcutsSection({ sec, color }: { sec: Extract<RefSection, { variant: "shortcuts" }>; color: string }) {
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="rounded-xl border border-[--border]">
        {sec.items.map((item, i) => (
          <div key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-4 py-3
              border-b border-[--border] last:border-0 hover:bg-[--bg-elevated] transition-colors"
          >
            <div className="flex items-center gap-1 sm:shrink-0 sm:w-36 flex-wrap">
              {item.keys.map((k, ki) => (
                <span key={ki} className="flex items-center gap-1">
                  {ki > 0 && <span className="text-[10px] text-[--text-muted]">+</span>}
                  <KeyBadge k={k} />
                </span>
              ))}
            </div>
            <span className="hidden sm:inline text-[--text-muted] text-xs shrink-0">→</span>
            <div className="flex-1 min-w-0">
              <span className="text-[13px] text-[--text-secondary]">{item.action}</span>
              {item.note && <span className="ml-2 text-[11px] text-[--text-muted]">({item.note})</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeSection({ sec, color }: { sec: Extract<RefSection, { variant: "code" }>; color: string }) {
  const { copied, copy } = useCopy(sec.code);
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="rounded-xl border border-[--border]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[--border]"
          style={{ background: "var(--bg-sidebar)" }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
            </div>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: `${color}18`, color }}>
              {sec.language}
            </span>
          </div>
          <button onClick={copy}
            className="flex items-center gap-1.5 text-[11px] text-[--text-muted] hover:text-[--text-primary]
              px-2 py-1 rounded-lg hover:bg-[--bg-elevated] transition-all">
            {copied
              ? <><CheckIcon className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
              : <><CopyIcon className="w-3 h-3" />Copy</>
            }
          </button>
        </div>
        <div className="overflow-x-auto rounded-b-xl" style={{ background: "var(--bg-elevated)" }}>
          <pre className="p-4 text-[13px] leading-relaxed"
            style={{ color: "var(--syn-code)", fontFamily: "var(--font-geist-mono, monospace)" }}>
            <code>{sec.code}</code>
          </pre>
        </div>
      </div>
      {sec.note && (
        <p className="mt-2 text-[12px] text-[--text-muted] italic pl-1">{sec.note}</p>
      )}
    </div>
  );
}

function TableSection({ sec, color }: { sec: Extract<RefSection, { variant: "table" }>; color: string }) {
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="rounded-xl border border-[--border]">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {sec.columns.map((col, i) => (
                  <th key={i}
                    className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ background: `${color}10`, color, borderBottom: "1px solid var(--border)" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sec.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[--border] last:border-0 hover:bg-[--bg-elevated] transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5">
                      {ci === 0
                        ? <code className="text-[12px] font-mono font-semibold"
                            style={{ color }}>{cell}</code>
                        : <span className="text-[13px] text-[--text-secondary]">{cell}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TipsSection({ sec, color }: { sec: Extract<RefSection, { variant: "tips" }>; color: string }) {
  const typeColors: Record<string, string> = {
    info:    "#38bdf8",
    warning: "#fbbf24",
    good:    "#34d399",
    bad:     "#f87171",
  };
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="flex flex-col gap-2">
        {sec.items.map((tip, i) => {
          const accent = tip.type ? typeColors[tip.type] : color;
          return (
            <div key={i}
              className="rounded-xl border border-[--border] px-4 py-3"
              style={{
                background: `${accent}06`,
                borderLeftWidth: "3px",
                borderLeftColor: accent,
              }}>
              <div className="text-[13px] font-semibold mb-0.5" style={{ color: accent }}>{tip.title}</div>
              <div className="text-[13px] text-[--text-secondary] leading-relaxed">{tip.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardsSection({ sec, color }: { sec: Extract<RefSection, { variant: "cards" }>; color: string }) {
  return (
    <div>
      <SectionHeader title={sec.title} description={sec.description} color={color} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        {sec.items.map((card, i) => {
          const accent = card.badgeColor ?? color;
          return (
            <div key={i}
              className="rounded-xl border border-[--border] p-4 hover:border-[--border-hover] transition-colors"
              style={{ background: "var(--bg-sidebar)" }}>
              <div className="flex items-start gap-3 mb-2">
                {card.badge && (
                  <span className="shrink-0 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg"
                    style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                    {card.badge}
                  </span>
                )}
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[--text-primary] leading-snug">{card.title}</div>
                  {card.subtitle && (
                    <div className="text-[11px] text-[--text-muted] mt-0.5">{card.subtitle}</div>
                  )}
                </div>
              </div>
              <p className="text-[13px] text-[--text-secondary] leading-relaxed">{card.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TextSection({ sec }: { sec: Extract<RefSection, { variant: "text" }> }) {
  return (
    <div>
      {sec.title && (
        <h4 className="text-[13px] font-bold text-[--text-primary] mb-2">{sec.title}</h4>
      )}
      <p className="text-[13px] text-[--text-secondary] leading-relaxed">{sec.content}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────

interface ReferenceViewerProps {
  data: ReferenceData;
  category: Category;
  section: Section;
}

export default function ReferenceViewer({ data, category, section }: ReferenceViewerProps) {
  const color = category.color;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 overflow-x-hidden min-w-0">
      {data.intro && (
        <div className="rounded-xl border border-[--border] px-5 py-4"
          style={{ background: `${color}06`, borderColor: `${color}25` }}>
          <p className="text-[14px] text-[--text-secondary] leading-relaxed">{data.intro}</p>
        </div>
      )}

      {data.sections.map((sec, i) => (
        <div key={i}>
          {sec.variant === "commands"  && <CommandsSection  sec={sec} color={color} />}
          {sec.variant === "shortcuts" && <ShortcutsSection sec={sec} color={color} />}
          {sec.variant === "code"      && <CodeSection      sec={sec} color={color} />}
          {sec.variant === "table"     && <TableSection     sec={sec} color={color} />}
          {sec.variant === "tips"      && <TipsSection      sec={sec} color={color} />}
          {sec.variant === "cards"     && <CardsSection     sec={sec} color={color} />}
          {sec.variant === "text"      && <TextSection      sec={sec} />}
        </div>
      ))}
    </div>
  );
}
