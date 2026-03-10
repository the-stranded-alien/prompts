"use client";

import { useState } from "react";
import { Section, Category, Item } from "../types";
import { FileIcon, ChevronRightIcon, getIconByName } from "./Icons";

interface SidebarProps {
  section: Section;
  selection: { categoryId: string; itemId: string } | null;
  onSelectItem: (categoryId: string, item: Item) => void;
  searchQuery: string;
}

function itemMatchesSearch(item: Item, q: string): boolean {
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function Sidebar({ section, selection, onSelectItem, searchQuery }: SidebarProps) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(section.categories.map((c) => c.id))
  );

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = searchQuery.toLowerCase();
  const filtered: Category[] = searchQuery
    ? section.categories
        .map((cat) => ({ ...cat, items: cat.items.filter((i) => itemMatchesSearch(i, q)) }))
        .filter((cat) => cat.items.length > 0)
    : section.categories;

  return (
    <nav className="flex flex-col gap-0.5 py-1">
      {filtered.map((category) => {
        const isOpen = searchQuery ? true : openFolders.has(category.id);
        const Icon = getIconByName(category.icon);

        return (
          <div key={category.id}>
            <button
              onClick={() => toggleFolder(category.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors hover:bg-white/5"
            >
              <ChevronRightIcon
                className={`w-3 h-3 text-zinc-600 shrink-0 transition-transform duration-150 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              <span style={{ color: category.color }} className="shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                {category.name}
              </span>
              <span className="ml-auto text-[10px] text-zinc-700 font-mono tabular-nums">
                {category.items.length}
              </span>
            </button>

            {isOpen && (
              <div className="ml-5 border-l border-zinc-800/80 pl-2 mb-1 flex flex-col gap-0.5">
                {category.items.map((item) => {
                  const isSelected =
                    selection?.categoryId === category.id &&
                    selection?.itemId === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectItem(category.id, item)}
                      className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition-all group ${
                        isSelected
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <FileIcon
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
                          isSelected ? "text-zinc-400" : "text-zinc-700 group-hover:text-zinc-500"
                        }`}
                      />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="text-sm leading-tight truncate"
                          style={isSelected ? { color: category.color } : { color: "#a1a1aa" }}
                        >
                          {item.title}
                        </span>
                        <span className="text-[11px] text-zinc-700 leading-tight line-clamp-1 group-hover:text-zinc-600">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
