'use client' // Wait, actions should be server-side, but they can be in a file with 'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { initializePaystackTransaction, verifyPaystackTransaction } from '@/lib/paystack'

export async function createOrderAction(formData: any, cartItems: any[]) {
  'use server'
  
  const payload = await getPayload({ config })
  
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  // 1. Create the Pending order in Payload
  const order = await payload.create({
    collection: 'orders',
    data: {
      customerEmail: formData.email,
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        priceAtPurchase: item.price,
        variant: item.variant,
      })),
      total,
      status: 'pending',
    },
  })

  // 2. Initialize Paystack
  try {
    const paystackData = await initializePaystackTransaction({
      email: formData.email,
      amount: total,
      metadata: {
        orderId: order.id,
        customerName: formData.fullName,
      }
    })

    // 3. Update order with payment reference (optional but good)
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        paymentIntentId: paystackData.reference
      }
    })

    return {
      success: true,
      url: paystackData.authorization_url
    }
  } catch (error: any) {
    console.error("Payment initialization failed", error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function verifyOrderAction(reference: string) {
  'use server'
  
  const payload = await getPayload({ config })
  
  try {
    const verification = await verifyPaystackTransaction(reference)
    
    if (verification.status === 'success') {
      const orderId = verification.metadata.orderId
      
      // Update order in Payload
      await payload.update({
        collection: 'orders',
        id: orderId,
        data: {
          status: 'paid'
        }
      })

      return { success: true, orderId }
    }
    
    return { success: false, error: 'Transaction was not successful' }
  } catch (error: any) {
    console.error("Verification failed", error)
    return { success: false, error: error.message }
  }
}

