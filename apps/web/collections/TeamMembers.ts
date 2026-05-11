import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural:   'Team Members',
  },
  admin: {
    useAsTitle:  'name',
    description: 'Add your team members to display on the About page.',
    group:       'Content',
  },
  fields: [
    {
      name:     'name',
      label:    'Full Name',
      type:     'text',
      required: true,
    },
    {
      name:     'role',
      label:    'Job Title',
      type:     'text',
      required: true,
    },
    {
      name:  'bio',
      label: 'Short Bio',
      type:  'textarea',
    },
    {
      name:       'photo',
      label:      'Profile Photo',
      type:       'upload',
      relationTo: 'media',
    },
    {
      name:  'linkedIn',
      label: 'LinkedIn Profile URL',
      type:  'text',
    },
    {
      name:  'order',
      label: 'Display Order (1 = first)',
      type:  'number',
    },
  ],
}
