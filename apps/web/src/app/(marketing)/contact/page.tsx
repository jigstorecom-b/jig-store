import React from 'react'
import { Button } from '@engine/ui'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            
            {/* Left: Info */}
            <div className="md:col-span-5 flex flex-col gap-10">
              <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter text-primary">
                Say hello.
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-sm">
                Whether you have a question about a piece or just want to talk shop, we'd love to hear from you.
              </p>
              
              <div className="flex flex-col gap-8 mt-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Email</span>
                  <a href="mailto:hello@jigstore.com" className="font-heading text-2xl font-bold hover:text-accent transition-colors">
                    hello@jigstore.com
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Instagram</span>
                  <a href="#" className="font-heading text-2xl font-bold hover:text-accent transition-colors">
                    @jigstore
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Lagos Studio</span>
                  <p className="font-heading text-xl font-bold">
                    Ikoyi, Lagos, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-7 bg-white p-8 md:p-12 shadow-card-hover border border-border rounded-sm">
              <form className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="font-mono text-xs uppercase tracking-widest font-bold">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-muted/50 border-none px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-mono text-xs uppercase tracking-widest font-bold">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-muted/50 border-none px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold">Subject</label>
                  <select className="w-full bg-muted/50 border-none px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Custom Commission</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-muted/50 border-none px-4 py-4 focus:ring-2 focus:ring-accent outline-none font-body transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {/* <Button variant="accent" size="lg" className="h-16 text-lg font-bold">
                  Send Message
                </Button> */}
                <button type="submit" className="h-16 text-lg font-bold bg-accent text-white rounded-sm px-8 hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
