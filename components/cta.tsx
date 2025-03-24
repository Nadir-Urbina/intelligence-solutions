"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className={`container max-w-4xl text-center transition-all duration-700 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Business with Kingdom Principles?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          What would your business on mission look like? There's just nothing like a business being put in the hands of
          the Chief CEO.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <a href="#contact">
            Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}

