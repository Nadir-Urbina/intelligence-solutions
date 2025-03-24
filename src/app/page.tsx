import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import CaseStudies from "@/components/case-studies"
import BlogPreview from "@/components/blog-preview"
import Contact from "@/components/contact"
import CTA from "@/components/cta"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <CaseStudies />
      <BlogPreview />
      <CTA />
      <Contact />
    </>
  )
}

