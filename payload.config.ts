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
  },
  collections: [Posts, Pages, Media, Users, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "your-secret-key-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
    },
    push: process.env.NODE_ENV === "development",
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
})
