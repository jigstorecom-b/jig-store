import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  
  if (!secret) {
    console.error('PAYSTACK_SECRET_KEY missing')
    return new Response('Configuration Error', { status: 500 })
  }

  const payload = await getPayload({ config })
  const body = await req.text()
  
  // Verify Paystack Signature
  const hash = crypto.createHmac('sha512', secret).update(body).digest('hex')
  const signature = req.headers.get('x-paystack-signature')

  if (hash !== signature) {
    return new Response('Invalid Signature', { status: 401 })
  }

  const event = JSON.parse(body)

  if (event.event === 'charge.success') {
    const reference = event.data.reference
    const orderId = event.data.metadata?.orderId

    if (orderId) {
      try {
        // Update order in Payload
        await payload.update({
          collection: 'orders',
          id: orderId,
          data: {
            status: 'paid',
          },
        })
        console.log(`Order ${orderId} marked as paid via webhook.`)
      } catch (err) {
        console.error(`Failed to update order ${orderId}:`, err)
      }
    }
  }

  return NextResponse.json({ status: 'success' })
}
