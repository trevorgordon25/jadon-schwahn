import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Works } from './collections/Works'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'app', '(payload)'),
    },
  },
  collections: [Users, Media, Works],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Pooled connection for app queries: DATABASE_URL_UNPOOLED opens a direct
    // connection per request, which is slow and exhausts Postgres connections
    // under serverless/dev concurrency.
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Server-side uploads pass the file buffer to Node's built-in fetch, which
      // throws "SharedArrayBuffer is not allowed" for small in-memory buffers.
      // Client uploads go browser -> Blob directly via a signed URL instead.
      clientUploads: true,
      // Vercel Blob rejects re-uploads of a filename that already exists (no
      // overwrite support in this plugin), so give every upload a unique name.
      addRandomSuffix: true,
    }),
  ],
})
