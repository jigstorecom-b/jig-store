import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users }       from './collections/Users'
import { Products }    from './collections/Products'
import { Categories }  from './collections/Categories'
import { Orders }      from './collections/Orders'
import { Pages }       from './collections/Pages'
import { Media }       from './collections/Media'

// Module toggles — configured for Jig storefront
const modules = {
  products:    true,
  orders:      true,
  categories:  true,
  pages:       true,
  services:    false,
  bookings:    false,
  blog:        false,
  team:        false,
  webinars:    false,
}

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),

  editor: lexicalEditor({}),

  collections: [
    Users,
    Media,
    Pages,
    ...(modules.products   ? [Products]   : []),
    ...(modules.categories ? [Categories] : []),
    ...(modules.orders     ? [Orders]     : []),
  ],

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Jig Admin',
    },
  },

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    disable: true, // Simplified for Jig storefront
  },

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET_NAME!,
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region:   'auto',
        credentials: {
          accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      },
    }),
  ],
})

