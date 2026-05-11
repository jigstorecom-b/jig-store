import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural:   'Products',
  },
  admin: {
    useAsTitle:  'name',
    description: 'Add and manage the products you sell.',
    group:       'Shop',
    defaultColumns: ['featuredImage', 'name', 'price', 'category', 'status'],
  },
  fields: [
    {
      name:     'name',
      label:    'Product Name',
      type:     'text',
      required: true,
    },
    {
      name:     'slug',
      label:    'URL Slug',
      type:     'text',
      required: true,
      unique:   true,
      admin: {
        description: 'Auto-generated if left blank (e.g. leather-tote-bag)',
      },
    },
    {
      name:  'tagline',
      label: 'Short Description',
      type:  'textarea',
    },
    {
      name:   'description',
      label:  'Full Description',
      type:   'richText',
      editor: lexicalEditor({}),
    },
    {
      name:     'price',
      label:    'Price (₦)',
      type:     'number',
      required: true,
    },
    {
      name:  'comparePrice',
      label: 'Original Price (for sale display)',
      type:  'number',
    },
    {
      name:       'category',
      label:      'Category',
      type:       'relationship',
      relationTo: 'categories',
      required:   true,
    },
    {
      name:  'featuredImage',
      label: 'Main Product Image',
      type:  'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name:       'gallery',
      label:      'Additional Images',
      type:       'array',
      maxRows:    5,
      fields: [
        {
          name:       'image',
          type:       'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'variants',
      label: 'Product Variants (Size, Colour, etc.)',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Variant Name (e.g. Large / Black)',
        },
        {
          name: 'stock',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'priceOverride',
          type: 'number',
          label: 'Custom Price for this variant (optional)',
        },
      ],
    },
    {
      name:  'featured',
      label: 'Show on Homepage',
      type:  'checkbox',
      defaultValue: false,
    },
    {
      name:         'status',
      label:        'Status',
      type:         'select',
      options:      [
        { label: 'Published', value: 'published' },
        { label: 'Draft',     value: 'draft'     },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

