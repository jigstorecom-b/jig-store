import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural:   'Pages',
  },
  admin: {
    useAsTitle:  'title',
    description: 'Edit the text and content of your website pages.',
    group:       'Content',
  },
  fields: [
    {
      name:     'title',
      label:    'Page Name',
      type:     'text',
      required: true,
    },
    {
      name:  'slug',
      label: 'Page URL',
      type:  'text',
      admin: { description: 'E.g. "about" creates yoursite.com/about' },
    },
    {
      name:  'heroHeading',
      label: 'Main Heading',
      type:  'text',
    },
    {
      name:  'heroSubtext',
      label: 'Subheading Text',
      type:  'textarea',
    },
    {
      name:  'heroImage',
      label: 'Banner Image',
      type:  'upload',
      relationTo: 'media',
    },
    {
      name:   'body',
      label:  'Page Content',
      type:   'richText',
      editor: lexicalEditor({}),
    },
    {
      name:         'publishedStatus',
      label:        'Published',
      type:         'select',
      options:      [
        { label: 'Published (visible to visitors)', value: 'published' },
        { label: 'Draft (hidden)',                  value: 'draft'     },
      ],
      defaultValue: 'draft',
    },
  ],
}
