'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  variant?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isDrawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jig-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('jig-cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => 
        item.id === newItem.id && item.variant === newItem.variant
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }

      return [...currentItems, newItem]
    })
    setDrawerOpen(true) // Open drawer when item is added
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      isDrawerOpen, 
      setDrawerOpen,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
