import { getPayload } from 'payload'
import config from '@payload-config'

// Fetch all published products
export async function getProducts() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: {
      status: { equals: 'published' }
    },
    sort: '-createdAt',
  })

  return result.docs
}

// Fetch products by category slug
export async function getProductsByCategory(categorySlug: string) {
  const payload = await getPayload({ config })

  // First find the category ID
  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: categorySlug }
    },
    limit: 1
  })

  const category = categoryResult.docs[0]
  if (!category) return null

  const result = await payload.find({
    collection: 'products',
    where: {
      category: { equals: category.id },
      status: { equals: 'published' }
    },
    sort: '-createdAt',
  })

  return {
    category,
    products: result.docs
  }
}

// Fetch one product by slug
export async function getProduct(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: slug }
    },
    limit: 1,
  })

  return result.docs[0] ?? null
}

// Fetch all categories
export async function getCategories() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'categories',
    sort: 'name',
  })

  return result.docs
}

// Fetch page by slug (for dynamic page content)
export async function getPage(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug:            { equals: slug },
      publishedStatus: { equals: 'published' },
    },
    limit: 1,
  })

  return result.docs[0] ?? null
}

