'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function submitBooking(formData: FormData) {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'bookings',
    data: {
      clientName:  formData.get('name')    as string,
      clientEmail: formData.get('email')   as string,
      clientPhone: formData.get('phone')   as string,
      service:     formData.get('service') as string,
      notes:       formData.get('notes')   as string,
      status:      'new',
    },
  })
}
