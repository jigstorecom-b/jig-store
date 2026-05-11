import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Booking',
    plural:   'Bookings',
  },
  admin: {
    useAsTitle:  'clientName',
    description: 'View all appointment and booking requests.',
    group:       'Business',
    defaultColumns: ['clientName', 'service', 'date', 'status'],
  },
  fields: [
    {
      name:     'clientName',
      label:    'Client Name',
      type:     'text',
      required: true,
    },
    {
      name:     'clientEmail',
      label:    'Client Email',
      type:     'email',
      required: true,
    },
    {
      name:  'clientPhone',
      label: 'Phone Number',
      type:  'text',
    },
    {
      name:  'service',
      label: 'Service Requested',
      type:  'text',
    },
    {
      name:  'date',
      label: 'Preferred Date',
      type:  'date',
    },
    {
      name:  'notes',
      label: 'Additional Notes',
      type:  'textarea',
    },
    {
      name:         'status',
      label:        'Booking Status',
      type:         'select',
      options:      [
        { label: 'New — not reviewed',   value: 'new'       },
        { label: 'Confirmed',            value: 'confirmed' },
        { label: 'Completed',            value: 'completed' },
        { label: 'Cancelled',            value: 'cancelled' },
      ],
      defaultValue: 'new',
    },
  ],
}
