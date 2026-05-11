import React from 'react'
import { Button } from '@engine/ui'
import { ShoppingBag, CheckCircle2 } from 'lucide-react'

export default function SuccessPage({ searchParams }: { searchParams: { orderId: string } }) {
  const orderId = searchParams.orderId

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-20 px-6">
      <div className="max-w-xl w-full text-center flex flex-col gap-10 items-center">
        
        <div className="relative">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </div>
          {/* Subtle pulse animation */}
          <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping -z-10" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Thank you for <br /> your order.
          </h1>
          <p className="text-xl text-muted-foreground font-body leading-relaxed">
            Your purchase was successful. We've sent a confirmation email to you and 
            we're already preparing your pieces for shipment.
          </p>
        </div>

        <div className="w-full bg-white border border-border p-8 rounded-sm flex flex-col gap-4 text-left">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Order ID</span>
            <span className="font-mono text-sm font-bold">#{orderId?.slice(-6).toUpperCase() || 'JIG-XXXX'}</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            You will receive a notification once your order has been fulfilled and is on its way to you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Button asChild variant="accent" size="lg" className="flex-1 h-16 text-lg font-bold">
            <a href="/shop">Continue Shopping</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 h-16 text-lg font-bold">
            <a href="/">Back to Home</a>
          </Button>
        </div>

      </div>
    </main>
  )
}
