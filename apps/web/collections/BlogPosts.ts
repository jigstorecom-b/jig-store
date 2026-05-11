import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural:   'Blog Posts',
  },
  admin: {
    useAsTitle:  'title',
    description: 'Write and publish articles for your blog.',
    group:       'Content',
    defaultColumns: ['title', 'author', 'publishedDate', 'status'],
  },
  fields: [
    {
      name:     'title',
      label:    'Post Title',
      type:     'text',
      required: true,
    },
    {
      name:  'excerpt',
      label: 'Short Preview (shown in listings)',
      type:  'textarea',
    },
    {
      name:   'content',
      label:  'Article Content',
      type:   'richText',
      editor: lexicalEditor({}),
    },
    {
      name:       'coverImage',
      label:      'Cover Image',
      type:       'upload',
      relationTo: 'media',
    },
    {
      name:  'author',
      label: 'Author Name',
      type:  'text',
    },
    {
      name:  'publishedDate',
      label: 'Publish Date',
      type:  'date',
    },
    {
      name:         'status',
      label:        'Published',
      type:         'select',
      options:      [
        { label: 'Published', value: 'published' },
        { label: 'Draft',     value: 'draft'     },
      ],
      defaultValue: 'draft',
    },
  ],
}
