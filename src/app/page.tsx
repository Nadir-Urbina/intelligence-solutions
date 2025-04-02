import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import CaseStudies from "@/components/case-studies"
import BlogPreview from "@/components/blog-preview"
import Contact from "@/components/contact"
import CTA from "@/components/cta"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Suspense fallback={<div className="py-24 bg-secondary/20"></div>}>
        <Testimonials />
      </Suspense>
      {/* Case Studies section temporarily hidden
      <Suspense fallback={<div className="py-24"></div>}>
        <CaseStudies />
      </Suspense>
      */}
      <Suspense fallback={<div className="py-24 bg-secondary/10"></div>}>
        <BlogPreview />
      </Suspense>
      <CTA />
      <Contact />
    </>
  )
}

