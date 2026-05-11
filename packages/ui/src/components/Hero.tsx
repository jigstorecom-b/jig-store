import React from 'react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface HeroProps {
  heading: string
  subtext?: string
  ctaText: string
  ctaHref: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export const Hero: React.FC<HeroProps> = ({
  heading,
  subtext,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt = 'Jig Product',
  className,
}) => {
  return (
    <section className={cn("relative w-full bg-background overflow-hidden", className)}>
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="md:col-span-6 flex flex-col items-start text-left">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-primary">
            {heading}
          </h1>
          {subtext && (
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-body max-w-lg">
              {subtext}
            </p>
          )}
          <div className="mt-10">
            <Button 
              variant="accent" 
              size="lg" 
              className="text-lg px-10 h-14"
              asChild
            >
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="md:col-span-6 relative">
          <div className="aspect-[4/5] md:aspect-square bg-muted rounded-sm overflow-hidden shadow-card-hover group">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono italic">
                [Product Visual Placeholder]
              </div>
            )}
          </div>
          
          {/* Accent decoration element (Optional, but adds to "editorial" feel) */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 -z-10 rounded-sm" />
        </div>
      </div>
    </section>
  )
}
