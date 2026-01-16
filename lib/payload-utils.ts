import { getPayloadClient } from "./payload"

// Fetch all published posts
export async function getPublishedPosts(locale?: string) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: "posts",
    where: {
      status: {
        equals: "published",
      },
      ...(locale && {
        locale: {
          equals: locale,
        },
      }),
    },
    sort: "-publishedAt",
    depth: 2,
  })

  return posts.docs
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string, locale?: string) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: "published",
      },
      ...(locale && {
        locale: {
          equals: locale,
        },
      }),
    },
    depth: 2,
    limit: 1,
  })

  return posts.docs[0] || null
}

// Fetch related posts by category
export async function getRelatedPosts(categoryId: string | number, excludeSlug: string, locale?: string, limit = 3) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: "posts",
    where: {
      category: {
        equals: categoryId,
      },
      slug: {
        not_equals: excludeSlug,
      },
      status: {
        equals: "published",
      },
      ...(locale && {
        locale: {
          equals: locale,
        },
      }),
    },
    sort: "-publishedAt",
    depth: 2,
    limit,
  })

  return posts.docs
}

// Fetch all pages
export async function getPublishedPages() {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: "pages",
    where: {
      status: {
        equals: "published",
      },
    },
    depth: 1,
  })

  return pages.docs
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: "published",
      },
    },
    depth: 1,
    limit: 1,
  })

  return pages.docs[0] || null
}

// Fetch all categories
export async function getCategories() {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: "categories",
    depth: 0,
  })

  return categories.docs
}

// Fetch media by ID
export async function getMediaById(id: string | number) {
  const payload = await getPayloadClient()

  try {
    const media = await payload.findByID({
      collection: "media",
      id,
    })
    return media
  } catch {
    return null
  }
}
