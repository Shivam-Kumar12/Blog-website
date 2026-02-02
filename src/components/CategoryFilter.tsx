import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) {
  return (
    <div className="py-8 overflow-x-auto">
      <div className="flex items-center gap-3 min-w-max px-4 md:px-0">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mr-2">Categories:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                ? 'bg-foreground text-background shadow-md'
                : 'bg-secondary text-foreground hover:bg-border border border-transparent'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
