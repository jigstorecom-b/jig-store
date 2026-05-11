"use client"

import React from 'react'
import { cn } from '../lib/utils'
import { ShoppingBag, Search, Menu } from 'lucide-react'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  onOpenMobileNav?: () => void
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMobileNav,
  className
}) => {
  return (
    <header className={cn("w-full bg-background border-b border-border sticky top-0 z-[50]", className)}>
      <div className="max-w-content mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Left: Desktop Nav / Mobile Menu */}
        <div className="flex items-center gap-8">
          <button 
            className="md:hidden p-2 hover:bg-muted rounded-full"
            onClick={onOpenMobileNav}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
            <a href="/about" className="hover:text-primary transition-colors">About</a>
          </nav>
        </div>

        {/* Center: Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <span className="font-heading text-2xl md:text-3xl font-extrabold tracking-tighter text-primary">
            JIG
          </span>
        </a>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-muted rounded-full transition-colors relative group"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-mono font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  )
}
