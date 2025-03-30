import { getCaseStudies } from "@/src/sanity/lib/client"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <main className="container py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <Link href="/#case-studies">
            <Button variant="ghost" className="mb-4 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground mt-2">
            Explore our successful client projects
          </p>
        </div>
      </div>

      {caseStudies.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">No case studies found</h3>
          <p className="text-muted-foreground">
            Check back later for case studies on our client work.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy: any) => (
            <Link
              key={caseStudy._id}
              href={`/case-studies/${caseStudy.slug.current}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <div className="relative aspect-[4/3]">
                  {caseStudy.mainImage ? (
                    <Image
                      src={caseStudy.mainImage.asset.url}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <p className="text-secondary-foreground">No image</p>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {caseStudy.title}
              </h3>
              {caseStudy.client && (
                <p className="text-muted-foreground mb-2">
                  Client: {caseStudy.client}
                </p>
              )}
              <p className="text-sm text-muted-foreground mb-4">
                {format(new Date(caseStudy.publishedAt), "MMMM d, yyyy")}
              </p>
              <p className="line-clamp-3 text-muted-foreground">
                {caseStudy.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
} 