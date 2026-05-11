import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Image or File',
    plural:   'Images & Files',
  },
  upload: {
    staticURL: process.env.R2_PUBLIC_URL,
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    description: 'Upload images and files to use across your website.',
    group:       'Content',
  },
  fields: [
    {
      name:  'alt',
      label: 'Image Description (for accessibility & SEO)',
      type:  'text',
    },
  ],
}
