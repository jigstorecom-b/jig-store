'use client'

import React, { useState } from 'react'
import { useCart } from '@/providers/CartProvider'
import { Button } from '@engine/ui'
import { createOrderAction } from './actions'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, totalItems } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email'),
      fullName: formData.get('fullName'),
      address: formData.get('address'),
      city: formData.get('city'),
    }

    const result = await createOrderAction(data, items)

    if (result.success && result.url) {
      window.location.href = result.url // Redirect to Paystack
    } else {
      setError(result.error || 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (items.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Your bag is empty.</h1>
          <Button asChild variant="outline">
            <a href="/shop">Go to Shop</a>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="border-b border-border bg-white py-6 px-6 md:px-8">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <a href="/" className="font-heading text-2xl font-extrabold tracking-tighter">JIG</a>
          <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          
          {/* Left: Shipping Form */}
          <div className="md:col-span-7">
            <h2 className="font-heading text-3xl font-bold mb-10">Shipping Information</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="font-mono text-xs uppercase tracking-widest font-bold">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-muted/30 border border-border px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-mono text-xs uppercase tracking-widest font-bold">Full Name</label>
                <input 
                  required
                  name="fullName"
                  type="text" 
                  className="w-full bg-muted/30 border border-border px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                  placeholder="First and Last Name"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-mono text-xs uppercase tracking-widest font-bold">Shipping Address</label>
                <textarea 
                  required
                  name="address"
                  rows={3}
                  className="w-full bg-muted/30 border border-border px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all resize-none"
                  placeholder="Street address, Apartment, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold">City</label>
                  <input 
                    required
                    name="city"
                    type="text" 
                    className="w-full bg-muted/30 border border-border px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold">State</label>
                  <input 
                    required
                    name="state"
                    type="text" 
                    className="w-full bg-muted/30 border border-border px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                    defaultValue="Lagos"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 rounded-sm">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-5 sticky top-32">
            <div className="bg-muted/30 border border-border p-8 rounded-sm flex flex-col gap-8">
              <h3 className="font-heading text-xl font-bold border-b border-border pb-4">Order Summary</h3>
              
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <span className="font-body font-bold text-sm leading-tight">{item.name}</span>
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-mono text-sm whitespace-nowrap">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-mono text-accent">FREE</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border mt-2">
                  <span className="font-heading font-bold text-lg uppercase">Total</span>
                  <span className="font-mono text-2xl font-bold">₦{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                variant="accent" 
                size="lg" 
                className="w-full h-16 text-lg font-bold mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Initializing Payment...' : 'Complete Purchase'}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                By clicking "Complete Purchase", you will be securely redirected to Paystack to complete your transaction.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
