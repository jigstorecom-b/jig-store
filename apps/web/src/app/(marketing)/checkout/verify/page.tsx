'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyOrderAction } from '../actions'
import { useCart } from '@/providers/CartProvider'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [error, setError] = useState<string | null>(null)
  
  const reference = searchParams.get('reference')

  useEffect(() => {
    if (!reference) {
      setError('No payment reference found.')
      return
    }

    async function verify() {
      const result = await verifyOrderAction(reference!)
      if (result.success) {
        clearCart() // Clear the bag on success
        router.push(`/checkout/success?orderId=${result.orderId}`)
      } else {
        setError(result.error || 'Verification failed.')
      }
    }

    verify()
  }, [reference, clearCart, router])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center flex flex-col gap-6">
        {!error ? (
          <>
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <h1 className="font-heading text-2xl font-bold">Verifying your payment...</h1>
            <p className="text-muted-foreground font-body">Please don't close this window.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-destructive/10 text-destructive flex items-center justify-center rounded-full mx-auto font-bold text-2xl">!</div>
            <h1 className="font-heading text-2xl font-bold text-destructive">Verification Failed</h1>
            <p className="text-muted-foreground font-body">{error}</p>
            <a href="/checkout" className="text-accent hover:underline font-medium">Try checking out again</a>
          </>
        )}
      </div>
    </main>
  )
}
