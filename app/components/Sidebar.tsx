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

function itemMatches(item: Item, q: string) {
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

  const toggle = (id: string) =>
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const q = searchQuery.toLowerCase();
  const filtered: Category[] = searchQuery
    ? section.categories
        .map((cat) => ({ ...cat, items: cat.items.filter((i) => itemMatches(i, q)) }))
        .filter((cat) => cat.items.length > 0)
    : section.categories;

  return (
    <nav className="flex flex-col py-1">
      {filtered.map((category) => {
        const isOpen = searchQuery ? true : openFolders.has(category.id);
        const Icon = getIconByName(category.icon);

        return (
          <div key={category.id} className="mb-1">
            {/* Category row */}
            <button
              onClick={() => toggle(category.id)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left
                transition-colors hover:bg-[--bg-elevated] group"
            >
              <ChevronRightIcon
                className={`w-3 h-3 shrink-0 transition-transform duration-150
                  text-[--text-muted] ${isOpen ? "rotate-90" : ""}`}
              />
              <span style={{ color: category.color }} className="shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[--text-muted]">
                {category.name}
              </span>
              <span
                className="ml-auto text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded"
                style={{ background: `${category.color}15`, color: category.color }}
              >
                {category.items.length}
              </span>
            </button>

            {/* Items */}
            {isOpen && (
              <div className="ml-4 mt-0.5 pl-3 border-l border-[--border] flex flex-col gap-0.5 mb-2">
                {category.items.map((item) => {
                  const isSelected =
                    selection?.categoryId === category.id && selection?.itemId === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectItem(category.id, item)}
                      className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left
                        transition-all group relative ${
                          isSelected
                            ? "bg-[--bg-elevated]"
                            : "hover:bg-[--bg-elevated]"
                        }`}
                    >
                      {/* Active indicator */}
                      {isSelected && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full -ml-[13px]"
                          style={{ backgroundColor: category.color }}
                        />
                      )}

                      <FileIcon
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
                          isSelected ? "text-[--text-secondary]" : "text-[--text-muted] group-hover:text-[--text-secondary]"
                        }`}
                      />
                      <div className="flex flex-col min-w-0">
                        <span
                          className="text-[13px] leading-snug truncate font-medium"
                          style={isSelected ? { color: category.color } : { color: "var(--text-secondary)" }}
                        >
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[--text-muted] leading-tight mt-0.5 line-clamp-1 group-hover:text-[--text-secondary] transition-colors">
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
