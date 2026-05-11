import { getPage, getProducts, getCategories } from '@/lib/payload'
import { Hero, CategoryStrip, ProductCard } from '@engine/ui'

export default async function HomePage() {
  // Fetch data in parallel for performance
  const [page, products, categories] = await Promise.all([
    getPage('home'),
    getProducts(),
    getCategories(),
  ])

  // Filter for featured products for the homepage grid
  const featuredProducts = products.filter(p => p.featured)
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8)

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section — "Warm minimalism with editorial confidence" */}
      <Hero 
        heading={page?.heroHeading || 'Sell beautifully. Manage effortlessly.'}
        subtext={page?.heroSubtext || 'The modern commerce engine for independent brands who care about craft.'}
        ctaText="Start Shopping"
        ctaHref="/shop"
        // In a real scenario, these would come from page.heroImage
        imageSrc="" 
      />

      {/* 2. Category Strip — Sticky navigation */}
      <CategoryStrip 
        categories={categories.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug
        }))}
      />

      {/* 3. Product Grid — "4 columns on desktop, 2 on mobile" */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-primary">
              Featured Pieces
            </h2>
            <a href="/shop" className="text-accent font-medium hover:underline underline-offset-4 transition-all">
              View All Products →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                slug={product.slug}
                // image logic: use featuredImage or first gallery item
                imageUrl={(product.featuredImage as any)?.url}
              />
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="py-20 text-center border border-dashed border-border rounded-sm">
              <p className="text-muted-foreground font-body">
                No products found. Start by adding some in the <a href="/admin" className="text-accent hover:underline">Jig Admin</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Secondary Call to Action (Optional Phase 1) */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6">
            Built for those who build things.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Jig is more than a store. It's a place where your craft gets the digital presentation it deserves.
          </p>
          <a 
            href="/about" 
            className="font-medium text-primary hover:text-accent transition-colors"
          >
            Learn about our philosophy →
          </a>
        </div>
      </section>
    </main>
  )
}

