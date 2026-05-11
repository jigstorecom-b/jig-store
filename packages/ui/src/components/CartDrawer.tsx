"use client"

import React from 'react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  variant?: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, newQty: number) => void
  onRemoveItem: (id: string) => void
  className?: string
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  className
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-bold">Your Bag</h2>
            <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-mono">
              {items.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="text-muted-foreground font-body">Your bag is empty.</p>
              <Button variant="outline" onClick={onClose}>Start Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 aspect-square bg-muted rounded-sm overflow-hidden flex-shrink-0">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold text-sm leading-tight">{item.name}</h3>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground mt-1">{item.variant}</p>
                      )}
                    </div>
                    <span className="font-mono text-sm">₦{item.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/30 flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Subtotal</span>
              <span className="font-mono text-2xl text-primary">₦{subtotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Shipping and taxes calculated at checkout. Free shipping on orders over ₦50,000.
            </p>
            <Button variant="accent" size="lg" className="w-full h-14 text-lg font-bold">
              Continue to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
