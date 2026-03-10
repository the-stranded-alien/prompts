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
    cat.items.slice(0, 3).map((item) => ({ item, cat }))
  );

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center bg-[--bg]">
      {/* Icon */}
      <div className="relative mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${section.color}25, ${section.color}08)`,
            border: `1px solid ${section.color}20`,
            boxShadow: `0 0 40px ${section.color}15`,
          }}
        >
          <span style={{ color: section.color }}>
            <SectionIcon className="w-7 h-7" />
          </span>
        </div>
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse shadow-lg"
          style={{ backgroundColor: section.color, boxShadow: `0 0 8px ${section.color}` }}
        />
      </div>

      <h2 className="text-lg font-bold text-[--text-primary] mb-1">{section.name}</h2>
      <p className="text-sm text-[--text-muted] max-w-xs leading-relaxed mb-10">{section.description}</p>

      {/* Quick-pick grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full max-w-2xl">
        {allItems.map(({ item, cat }) => {
          const CatIcon = getIconByName(cat.icon);
          return (
            <button
              key={`${cat.id}-${item.id}`}
              onClick={() => onSelectItem(cat.id, item)}
              className="flex items-start gap-3 p-4 rounded-xl text-left transition-all group
                bg-[--bg-sidebar] border border-[--border] hover:border-[--border-hover]
                hover:shadow-lg hover:-translate-y-0.5"
              style={{ ["--tw-shadow" as string]: `0 8px 24px ${cat.color}10` }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}20` }}
              >
                <span style={{ color: cat.color }}>
                  <CatIcon className="w-4 h-4" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[--text-secondary] truncate group-hover:text-[--text-primary] transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] text-[--text-muted] mt-0.5 line-clamp-2 leading-snug">
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
