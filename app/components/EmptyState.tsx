"use client";

import { Section, Item } from "../types";
import { getIconByName } from "./Icons";

interface EmptyStateProps {
  section: Section;
  onSelectItem: (categoryId: string, item: Item) => void;
}

export default function EmptyState({ section, onSelectItem }: EmptyStateProps) {
  const SectionIcon = getIconByName(section.icon);
  const allItems = section.categories.flatMap((cat) =>
    cat.items.slice(0, 2).map((item) => ({ item, cat }))
  );

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center">
      <div className="relative mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${section.color}18`, border: `1px solid ${section.color}25` }}
        >
          <span style={{ color: section.color }}><SectionIcon className="w-8 h-8" /></span>
        </div>
        <div
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-pulse"
          style={{ backgroundColor: section.color }}
        />
      </div>

      <h2 className="text-xl font-bold text-white mb-1.5">{section.name}</h2>
      <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-8">{section.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
        {allItems.map(({ item, cat }) => {
          const CatIcon = getIconByName(cat.icon);
          return (
            <button
              key={`${cat.id}-${item.id}`}
              onClick={() => onSelectItem(cat.id, item)}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/3 border border-white/6 text-left hover:bg-white/6 hover:border-white/12 transition-all group"
            >
              <div
                className="flex items-center justify-center w-7 h-7 rounded-md shrink-0 mt-0.5"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                <CatIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-zinc-300 truncate group-hover:text-white transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2 leading-tight group-hover:text-zinc-500 transition-colors">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
