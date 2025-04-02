import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getCaseStudies } from "@/src/sanity/lib/client"
import { format } from "date-fns"
import { SanityImage } from "@/components/ui/optimized-image"

// Fallback case studies when none are available from Sanity
const fallbackCaseStudies = [
  {
    _id: "fallback1",
    title: "Nedderman Construction Group",
    slug: { current: "#" },
    client: "Nedderman Construction",
    excerpt: "Helped scale from $20M to $30M annual revenue through kingdom-focused business strategies and leadership development.",
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ["Construction"]
  },
  {
    _id: "fallback2",
    title: "Lime Media",
    slug: { current: "#" },
    client: "Lime Media",
    excerpt: "Partnered to implement faith-based principles in business operations, resulting in sustainable growth and improved company culture.",
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ["Media"]
  },
  {
    _id: "fallback3",
    title: "Kingdom Enterprise",
    slug: { current: "#" },
    client: "Kingdom Enterprise",
    excerpt: "Developed a comprehensive strategy for integrating faith values into business practices, leading to increased employee engagement and customer loyalty.",
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ["Retail"]
  }
]

export default async function CaseStudies() {
  let caseStudies = []
  
  try {
    caseStudies = await getCaseStudies()
  } catch (error) {
    console.error("Error fetching case studies:", error)
  }
  
  // Use fallback data if no case studies are available from Sanity
  if (!caseStudies || caseStudies.length === 0) {
    caseStudies = fallbackCaseStudies
  }
  
  // Only display up to 3 case studies on the homepage
  const displayedCaseStudies = caseStudies.slice(0, 3)

  return (
    <section id="case-studies" className="py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Case Studies
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Explore how we've helped businesses achieve digital transformation through strategic solutions.
            </p>
          </div>
          <Link href="/case-studies" className="mt-6 md:mt-0">
            <Button variant="outline" className="group w-full sm:w-auto text-sm">
              View all case studies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedCaseStudies.map((caseStudy: any) => {
            return (
              <Link
                key={caseStudy._id}
                href={caseStudy.slug.current !== "#" ? `/case-studies/${caseStudy.slug.current}` : "#"}
                className="group flex flex-col h-full"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <div className="relative aspect-[4/3] w-full h-[240px]">
                    {caseStudy.mainImage && caseStudy.mainImage.asset ? (
                      <SanityImage
                        image={caseStudy.mainImage}
                        alt={caseStudy.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="transition-transform duration-300 group-hover:scale-105 object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center relative">
                        <Image
                          src="/placeholder.jpg"
                          alt={caseStudy.title}
                          fill
                          className="object-cover opacity-30"
                        />
                        <p className="text-secondary-foreground absolute z-10">
                          {caseStudy.categories && caseStudy.categories[0] || "Case Study"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {caseStudy.title}
                </h3>
                {caseStudy.client && (
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Client: {caseStudy.client}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  {format(new Date(caseStudy.publishedAt), "MMMM d, yyyy")}
                </p>
                <p className="text-sm sm:text-base line-clamp-3 text-muted-foreground mt-auto">
                  {caseStudy.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}

