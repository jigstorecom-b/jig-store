"use client"

import React from 'react'
import { cn } from '../lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryStripProps {
  categories: Category[]
  activeSlug?: string
  className?: string
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  activeSlug,
  className,
}) => {
  return (
    <div className={cn("w-full border-b border-border bg-background sticky top-[60px] z-20", className)}>
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 md:py-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/shop/${category.slug}`}
              className={cn(
                "whitespace-nowrap px-6 py-2 rounded-full border text-sm font-medium transition-all duration-150",
                category.slug === activeSlug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-border hover:border-accent hover:text-accent"
              )}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
