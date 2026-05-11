export async function initializePaystackTransaction({
  email,
  amount,
  metadata,
}: {
  email: string
  amount: number
  metadata?: any
}) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not defined')
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Paystack expects kobo/cents
      metadata,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
    }),
  })

  const data = await response.json()

  if (!data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction')
  }

  return data.data // contains authorization_url and reference
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not defined')
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  })

  const data = await response.json()

  if (!data.status) {
    throw new Error(data.message || 'Failed to verify Paystack transaction')
  }

  return data.data // contains status: 'success', etc.
}
