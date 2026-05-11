import { getProductsByCategory, getCategories } from '@/lib/payload'
import { CategoryStrip, ProductCard } from '@engine/ui'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category: categorySlug } = params
  
  const [data, categories] = await Promise.all([
    getProductsByCategory(categorySlug),
    getCategories(),
  ])

  if (!data) {
    return notFound()
  }

  const { category, products } = data

  return (
    <main className="min-h-screen bg-background">
      <CategoryStrip 
        categories={categories.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug
        }))}
        activeSlug={categorySlug}
      />

      <section className="py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-primary">
              {category.name}
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Showing {products.length} pieces
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                slug={product.slug}
                imageUrl={(product.featuredImage as any)?.url}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-32 text-center border border-dashed border-border rounded-sm">
              <p className="text-muted-foreground font-body text-lg">
                No pieces found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
