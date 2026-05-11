'use client'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import { ProductDetail } from '@engine/ui'

export const ProductPageClient = ({ product }: { product: any }) => {
  const { addItem } = useCart()

  return (
    <ProductDetail 
      product={product}
      onAddToCart={addItem}
    />
  )
}
