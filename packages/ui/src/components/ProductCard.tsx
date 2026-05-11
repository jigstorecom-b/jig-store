import React from 'react'
import { cn } from '../lib/utils'

interface ProductCardProps {
  name: string
  price: number
  imageUrl?: string
  slug: string
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  slug,
  className,
}) => {
  return (
    <a 
      href={`/products/${slug}`}
      className={cn(
        "group flex flex-col bg-white overflow-hidden transition-all duration-200 hover:shadow-card-hover",
        className
      )}
    >
      <div className="aspect-[4/5] bg-muted overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono italic text-xs px-4 text-center">
            [Product Image Placeholder]
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-heading text-lg font-bold text-primary truncate">
          {name}
        </h3>
        <p className="font-mono text-base text-primary">
          ₦{price.toLocaleString()}
        </p>
      </div>
    </a>
  )
}
