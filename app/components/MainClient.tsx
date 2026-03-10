"use client";

import { useState } from "react";
import { Section, Item, Selection } from "../types";
import Sidebar from "./Sidebar";
import ItemViewer from "./ItemViewer";
import EmptyState from "./EmptyState";
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

  const handleSelectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
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

  const totalItems = activeSection?.categories.reduce((sum, c) => sum + c.items.length, 0) ?? 0;

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-[264px] flex-none flex flex-col bg-zinc-950 border-r border-zinc-800/60
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Site header */}
        <div className="flex-none px-4 pt-5 pb-3 border-b border-zinc-800/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-white tracking-tight">vault</span>
              <span className="text-sm text-zinc-600 tracking-tight">· guptasahil.in</span>
            </div>
            <button className="lg:hidden p-1 text-zinc-500 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Section switcher */}
          <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800/60">
            {sections.map((section) => {
              const Icon = getIconByName(section.icon);
              const isActive = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSelectSection(section.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                  />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="flex-none px-3 py-2.5 border-b border-zinc-800/40">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${activeSection?.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800/60 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors"
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
        <div className="flex-none px-4 py-2.5 border-t border-zinc-800/60">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-zinc-700">vault.guptasahil.in</p>
            <p className="text-[10px] text-zinc-700 tabular-nums">{totalItems} items</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60 flex-none">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-zinc-500 hover:text-white">
            <MenuIcon className="w-5 h-5" />
          </button>
          {selection && selectedCategory && activeSection ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: activeSection.color }}>
                {activeSection.name}
              </span>
              <span className="text-zinc-700 text-xs">/</span>
              <span className="text-sm text-zinc-300 truncate">{selection.item.title}</span>
            </div>
          ) : (
            <span className="text-sm text-zinc-500">{activeSection?.name}</span>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {selection && selectedCategory && activeSection ? (
            <ItemViewer
              item={selection.item}
              category={selectedCategory}
              section={activeSection}
            />
          ) : (
            activeSection && (
              <EmptyState
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
