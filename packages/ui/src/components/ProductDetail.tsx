'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    price: number
    description?: any // Lexical rich text
    tagline?: string
    images: { id: string; url: string }[]
    variants?: { name: string; stock: number; priceOverride?: number }[]
  }
  onAddToCart: (item: any) => void
  className?: string
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, className }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.url)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.name)

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(prev => prev + 1)
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1)
  }

  return (
    <div className={cn("max-w-content mx-auto px-6 md:px-8 py-12 md:py-24", className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="aspect-[4/5] bg-muted overflow-hidden rounded-sm relative group">
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-opacity duration-150"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono italic">
                [No Image Available]
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={cn(
                    "w-24 aspect-square rounded-sm overflow-hidden border-2 transition-all",
                    selectedImage === img.url ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="md:col-span-5 flex flex-col items-start pt-4">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            {product.name}
          </h1>
          
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-mono text-3xl text-primary">
              ₦{product.price.toLocaleString()}
            </span>
            {product.tagline && (
              <span className="text-muted-foreground font-body italic">
                — {product.tagline}
              </span>
            )}
          </div>

          <div className="mt-10 w-full border-t border-border pt-10 flex flex-col gap-8">
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Select Options
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v.name)}
                      className={cn(
                        "px-6 py-2 rounded-full border text-sm font-medium transition-all",
                        selectedVariant === v.name
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-primary border-border hover:border-accent"
                      )}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Quantity
                </span>
                <div className="flex items-center border border-border rounded-sm overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange('dec')}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange('inc')}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button 
                variant="accent" 
                size="lg" 
                className="w-full h-16 text-lg font-bold"
                onClick={() => onAddToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: quantity,
                  imageUrl: selectedImage,
                  variant: selectedVariant
                })}
              >
                Add to Cart
              </Button>
            </div>

            {/* Simple Description (Placeholder for Lexical) */}
            <div className="mt-4 prose prose-sm max-w-none text-muted-foreground font-body leading-relaxed">
              <p>
                Jig products are crafted with intention. This piece reflects our commitment 
                to quality materials and timeless editorial design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
