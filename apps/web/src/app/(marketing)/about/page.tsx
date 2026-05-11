import React from 'react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Narrative Section */}
      <section className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <h1 className="font-heading text-5xl md:text-8xl font-extrabold text-primary leading-[1.1] tracking-tighter">
            We build things <br /> that deserve to <br /> be seen.
          </h1>
          
          <div className="flex flex-col gap-8 text-xl md:text-2xl text-muted-foreground font-body leading-relaxed">
            <p>
              Jig was born from a simple observation: most e-commerce platforms feel like 
              spreadsheets. They are designed for volume, not for the soul of the craft.
            </p>
            <p>
              We believe that every piece has a story, and that story is told through 
              whitespace, typography, and intentional presentation. Our philosophy is 
              rooted in **Editorial Confidence**—the belief that less is more, but 
              the "less" must be perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Points */}
      <section className="py-24 bg-muted/30 px-6 md:px-8">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent font-bold tracking-widest text-sm uppercase">01</span>
            <h2 className="font-heading text-2xl font-bold">Warm Minimalism</h2>
            <p className="text-muted-foreground font-body">
              Generous spacing that allows each product to stand on its own, avoiding the 
              clutter of traditional marketplaces.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent font-bold tracking-widest text-sm uppercase">02</span>
            <h2 className="font-heading text-2xl font-bold">Craft Integrity</h2>
            <p className="text-muted-foreground font-body">
              Every pixel is placed with the same care you put into your products. No 
              placeholders, no generic templates.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent font-bold tracking-widest text-sm uppercase">03</span>
            <h2 className="font-heading text-2xl font-bold">Local Pride</h2>
            <p className="text-muted-foreground font-body">
              Built in Lagos for the world. We understand the nuances of the African 
              market, from Paystack integrations to mobile-first navigation.
            </p>
          </div>
        </div>
      </section>

      {/* The Maker Section */}
      <section className="py-32 px-6 md:px-8">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-16">
          <div className="md:col-span-5 aspect-[4/5] bg-muted rounded-sm overflow-hidden shadow-card-hover">
            {/* Placeholder for the founder's photo */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono italic">
              [The Maker Visual]
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight">
              A note from the <br /> founder.
            </h2>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
              <p>
                "Jig isn't just about selling. It's about how you feel when you show your 
                work to the world. It's about that moment of confidence when you send a 
                link and know it looks premium."
              </p>
              <p className="font-heading text-primary font-bold text-2xl">— Michael</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
