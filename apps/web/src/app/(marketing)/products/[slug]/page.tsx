import { getProduct, getProducts } from '@/lib/payload'
import { ProductCard } from '@engine/ui'
import { ProductPageClient } from '@/components/ProductPageClient'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Fetch product and related products in parallel
  const [product, allProducts] = await Promise.all([
    getProduct(slug),
    getProducts()
  ])

  if (!product) {
    return notFound()
  }

  // Find related products (same category, excluding current)
  const relatedProducts = allProducts
    .filter(p => p.category === (product.category as any)?.id && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      <ProductPageClient 
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          tagline: product.tagline,
          description: product.description,
          images: [
            { id: 'featured', url: (product.featuredImage as any)?.url },
            ...(product.gallery?.map((g: any) => ({ id: g.id, url: g.image?.url })) || [])
          ].filter(img => img.url)
        }} 
      />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-6 md:px-8 border-t border-border">
          <div className="max-w-content mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-12">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  price={p.price}
                  slug={p.slug}
                  imageUrl={(p.featuredImage as any)?.url}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
