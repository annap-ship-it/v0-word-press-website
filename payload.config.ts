import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import path from "path"
import { fileURLToPath } from "url"

// Collections
import { Posts } from "./collections/Posts"
import { Pages } from "./collections/Pages"
import { Media } from "./collections/Media"
import { Users } from "./collections/Users"
import { Categories } from "./collections/Categories"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- IdeaTeam Admin",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Ukrainian", 
        code: "uk",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  collections: [Posts, Pages, Media, Users, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "default-secret-please-change-in-production-123456789",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL,
    },
    schemaName: "payload",
    push: true,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
})
