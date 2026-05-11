import type { CollectionConfig } from 'payload'

export const Webinars: CollectionConfig = {
  slug: 'webinars',
  labels: {
    singular: 'Webinar',
    plural:   'Webinars',
  },
  admin: {
    useAsTitle:  'title',
    description: 'Schedule and manage upcoming webinars and events.',
    group:       'Events',
  },
  fields: [
    {
      name:     'title',
      label:    'Webinar Title',
      type:     'text',
      required: true,
    },
    {
      name:  'description',
      label: 'What attendees will learn',
      type:  'textarea',
    },
    {
      name:     'date',
      label:    'Date & Time',
      type:     'date',
      required: true,
    },
    {
      name:  'duration',
      label: 'Duration (e.g. "90 minutes")',
      type:  'text',
    },
    {
      name:  'hostName',
      label: 'Host Name',
      type:  'text',
    },
    {
      name:  'registrationLink',
      label: 'Registration Link',
      type:  'text',
    },
    {
      name:  'price',
      label: 'Ticket Price (₦) — leave blank if free',
      type:  'number',
    },
    {
      name:       'coverImage',
      label:      'Promo Image',
      type:       'upload',
      relationTo: 'media',
    },
    {
      name:         'status',
      label:        'Status',
      type:         'select',
      options:      [
        { label: 'Upcoming',    value: 'upcoming'   },
        { label: 'Live now',    value: 'live'       },
        { label: 'Recorded',   value: 'recorded'   },
        { label: 'Cancelled',  value: 'cancelled'  },
      ],
      defaultValue: 'upcoming',
    },
  ],
}
