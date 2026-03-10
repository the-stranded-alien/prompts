"use client";

import { useState } from "react";
import { Section, Item, Selection } from "../types";
import Sidebar from "./Sidebar";
import ItemViewer from "./ItemViewer";
import EmptyState from "./EmptyState";
import ThemeToggle from "./ThemeToggle";
import { SearchIcon, MenuIcon, XIcon, getIconByName } from "./Icons";

function SocialIcon({ name, className }: { name: string; className?: string }) {
  if (name === "github") return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
  if (name === "linkedin") return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
  if (name === "globe") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
  if (name === "pen") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );
  return null;
}

interface MainClientProps {
  sections: Section[];
}

export default function MainClient({ sections }: MainClientProps) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0];

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    setSelection(null);
    setSearchQuery("");
  };

  const handleSelectItem = (categoryId: string, item: Item) => {
    setSelection({ sectionId: activeSectionId, categoryId, item });
    setSidebarOpen(false);
  };

  const selectedCategory = selection
    ? activeSection?.categories.find((c) => c.id === selection.categoryId)
    : null;

  const totalItems = activeSection?.categories.reduce((s, c) => s + c.items.length, 0) ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-[--bg]">
      {/* ── Animated background ───────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────── */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-64 flex-none flex flex-col
          border-r border-[--border]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "var(--bg-sidebar)" }}
      >
        {/* Logo */}
        <div className="flex-none px-4 pt-4 pb-3 border-b border-[--border]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* SG monogram with float animation */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 animate-float logo-shimmer"
                style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
              >
                <span className="text-white text-[11px] font-black tracking-tight leading-none">SG</span>
              </div>
              <p className="text-[13px] font-bold text-[--text-primary] leading-none">AI Vault</p>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg
                  text-[--text-muted] hover:text-[--text-primary] hover:bg-[--bg-elevated] transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section switcher */}
        <div className="flex-none px-3 py-2.5 border-b border-[--border]">
          <div
            className="flex gap-1 p-1 rounded-xl border border-[--border]"
            style={{ background: "var(--bg-elevated)" }}
          >
            {sections.map((s) => {
              const Icon = getIconByName(s.icon);
              const isActive = s.id === activeSectionId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSection(s.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg
                    text-[11px] font-bold transition-all duration-200 ${
                    isActive
                      ? "text-[--text-primary] shadow-sm"
                      : "text-[--text-muted] hover:text-[--text-secondary]"
                  }`}
                  style={isActive ? { background: "var(--bg-sidebar)" } : {}}
                >
                  <span style={isActive ? { color: s.color } : {}}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="flex-none px-3 py-2 border-b border-[--border]">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[--text-muted] pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${activeSection?.name.toLowerCase()}…`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[--border] rounded-lg pl-8 pr-3 py-1.5 text-xs
                text-[--text-primary] placeholder-[--text-muted] outline-none transition-all
                focus:border-[--border-hover] focus:ring-1 focus:ring-[--border-hover]"
              style={{ background: "var(--bg)" }}
            />
          </div>
        </div>

        {/* Nav tree */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {activeSection && (
            <Sidebar
              section={activeSection}
              selection={
                selection?.sectionId === activeSectionId
                  ? { categoryId: selection.categoryId, itemId: selection.item.id }
                  : null
              }
              onSelectItem={handleSelectItem}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex-none px-4 pt-3 pb-4 border-t border-[--border]">
          {/* Social links */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {[
              { label: "GitHub",    href: "https://github.com/the-stranded-alien",      icon: "github" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/sahilgupta1611", icon: "linkedin" },
              { label: "Portfolio", href: "https://portfolio.guptasahil.in/",           icon: "globe" },
              { label: "Blogs",     href: "https://blogs.guptasahil.in/",               icon: "pen" },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium
                  text-[--text-muted] border border-[--border] transition-all
                  hover:text-[--text-primary] hover:border-[--border-hover] hover:bg-[--bg-elevated]"
              >
                <SocialIcon name={icon} className="w-3 h-3 shrink-0" />
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[--text-muted]">vault.guptasahil.in</span>
            <span
              className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded"
              style={{ background: `${activeSection?.color}14`, color: activeSection?.color }}
            >
              {totalItems} items
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div
          className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[--border] flex-none"
          style={{ background: "var(--bg-sidebar)" }}
        >
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-[--text-muted] hover:text-[--text-primary] transition-colors">
            <MenuIcon className="w-5 h-5" />
          </button>
          {selection && activeSection ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: activeSection.color }}>
                {activeSection.name}
              </span>
              <span className="text-[--text-muted] text-xs">/</span>
              <span className="text-sm text-[--text-secondary] truncate">{selection.item.title}</span>
            </div>
          ) : (
            <span className="text-sm font-bold text-[--text-primary]">AI Vault</span>
          )}
          <div className="ml-auto"><ThemeToggle /></div>
        </div>

        <div className="flex-1 overflow-hidden">
          {selection && selectedCategory && activeSection ? (
            <ItemViewer
              key={`${selection.sectionId}-${selection.categoryId}-${selection.item.id}`}
              item={selection.item}
              category={selectedCategory}
              section={activeSection}
            />
          ) : (
            activeSection && (
              <EmptyState
                key={activeSectionId}
                section={activeSection}
                onSelectItem={handleSelectItem}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
