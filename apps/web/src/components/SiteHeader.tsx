'use client'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import { Header } from '@engine/ui'

export const SiteHeader = () => {
  const { totalItems, setDrawerOpen } = useCart()

  return (
    <Header 
      cartCount={totalItems}
      onOpenCart={() => setDrawerOpen(true)}
    />
  )
}
