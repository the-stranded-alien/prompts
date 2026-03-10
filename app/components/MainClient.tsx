"use client";

import { useState } from "react";
import { Section, Item, Selection } from "../types";
import Sidebar from "./Sidebar";
import ItemViewer from "./ItemViewer";
import EmptyState from "./EmptyState";
import ThemeToggle from "./ThemeToggle";
import { SearchIcon, MenuIcon, XIcon, getIconByName } from "./Icons";

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
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-dot-grid" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────── */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-64 flex-none flex flex-col
          bg-[--bg-sidebar] border-r border-[--border]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex-none px-4 pt-4 pb-3 border-b border-[--border]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* SG monogram */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25">
                <span className="text-white text-[11px] font-black tracking-tight leading-none">SG</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[--text-primary] leading-none">AI Vault</p>
                <p className="text-[10px] text-[--text-muted] mt-0.5 leading-none">by Sahil Gupta</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-[--text-muted] hover:text-[--text-primary] hover:bg-[--bg-elevated]" onClick={() => setSidebarOpen(false)}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section switcher */}
        <div className="flex-none px-3 py-2.5 border-b border-[--border]">
          <div className="flex gap-1 p-1 bg-[--bg-elevated] rounded-xl border border-[--border]">
            {sections.map((s) => {
              const Icon = getIconByName(s.icon);
              const isActive = s.id === activeSectionId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSection(s.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive
                      ? "bg-[--bg-sidebar] text-[--text-primary] shadow-sm"
                      : "text-[--text-muted] hover:text-[--text-secondary]"
                  }`}
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
              className="w-full bg-[--bg] border border-[--border] rounded-lg pl-8 pr-3 py-1.5 text-xs
                text-[--text-primary] placeholder-[--text-muted] outline-none
                focus:border-[--border-hover] transition-colors"
            />
          </div>
        </div>

        {/* Nav */}
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
        <div className="flex-none px-4 py-2.5 border-t border-[--border]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[--text-muted]">vault.guptasahil.in</span>
            <span
              className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded"
              style={{ background: `${activeSection?.color}12`, color: activeSection?.color }}
            >
              {totalItems} items
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[--border] bg-[--bg-sidebar] flex-none">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-[--text-muted] hover:text-[--text-primary]">
            <MenuIcon className="w-5 h-5" />
          </button>
          {selection && activeSection ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: activeSection.color }}>
                {activeSection.name}
              </span>
              <span className="text-[--text-muted] text-xs">/</span>
              <span className="text-sm text-[--text-secondary] truncate">{selection.item.title}</span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-[--text-primary]">AI Vault</span>
          )}
          <div className="ml-auto"><ThemeToggle /></div>
        </div>

        <div className="flex-1 overflow-hidden">
          {selection && selectedCategory && activeSection ? (
            <ItemViewer item={selection.item} category={selectedCategory} section={activeSection} />
          ) : (
            activeSection && <EmptyState section={activeSection} onSelectItem={handleSelectItem} />
          )}
        </div>
      </main>
    </div>
  );
}
