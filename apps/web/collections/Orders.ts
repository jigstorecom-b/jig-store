import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    group: 'Shop',
    defaultColumns: ['id', 'customerEmail', 'total', 'status', 'createdAt'],
  },
  access: {
    read: () => true, // Merchant can read all, logic for customer can be added later
  },
  fields: [
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          required: true,
        },
        {
          name: 'priceAtPurchase',
          type: 'number',
          required: true,
        },
        {
          name: 'variant',
          type: 'text', // e.g. "Size: L, Colour: Black"
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'paymentIntentId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
