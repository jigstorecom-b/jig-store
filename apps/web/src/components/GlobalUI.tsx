'use client'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import { CartDrawer } from '@engine/ui'

export const GlobalUI = () => {
  const { isDrawerOpen, setDrawerOpen, items, updateQuantity, removeItem } = useCart()

  return (
    <>
      <CartDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  )
}
