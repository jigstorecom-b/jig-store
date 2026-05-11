import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural:   'Services',
  },
  admin: {
    useAsTitle:  'title',
    description: 'List and manage the services you offer to clients.',
    group:       'Business',
  },
  fields: [
    {
      name:     'title',
      label:    'Service Name',
      type:     'text',
      required: true,
    },
    {
      name:  'summary',
      label: 'Short Summary',
      type:  'textarea',
    },
    {
      name:   'details',
      label:  'Full Details',
      type:   'richText',
      editor: lexicalEditor({}),
    },
    {
      name:  'price',
      label: 'Starting Price (₦)',
      type:  'text',   // text for "From ₦50,000" flexibility
    },
    {
      name:       'icon',
      label:      'Service Icon',
      type:       'upload',
      relationTo: 'media',
    },
    {
      name:  'featured',
      label: 'Show on Homepage',
      type:  'checkbox',
      defaultValue: false,
    },
  ],
}
