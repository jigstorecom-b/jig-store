import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Team Account',
    plural:   'Team Accounts',
  },
  auth: true,
  admin: {
    useAsTitle:  'email',
    description: 'Manage who has access to the admin panel.',
    group:       'Settings',
  },
  fields: [
    {
      name:  'fullName',
      label: 'Full Name',
      type:  'text',
      required: true,
    },
    {
      name:  'role',
      label: 'Role',
      type:  'select',
      options: [
        { label: 'Admin (full access)',    value: 'admin'    },
        { label: 'Editor (content only)',  value: 'editor'   },
        { label: 'Viewer (read only)',     value: 'viewer'   },
      ],
      defaultValue: 'editor',
      required: true,
    },
  ],
}
