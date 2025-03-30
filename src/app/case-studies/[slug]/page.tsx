import { getCaseStudyBySlug } from "@/src/sanity/lib/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { portableTextComponents } from "@/components/portable-text-components"
import { urlFor } from "@/src/sanity/lib/client"

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Await params to access its properties (Next.js 15 requirement)
  const resolvedParams = await params;
  const caseStudy = (await getCaseStudyBySlug(resolvedParams.slug))[0]
  
  if (!caseStudy) {
    notFound()
  }

  // Check if we have a valid image to display
  const hasValidImage = caseStudy.mainImage && 
                       caseStudy.mainImage.asset && 
                       (caseStudy.mainImage.asset.url || caseStudy.mainImage.asset._ref);
  
  // Get the image URL using urlFor if we have a reference
  const imageUrl = hasValidImage ? 
    (caseStudy.mainImage.asset.url || urlFor(caseStudy.mainImage).url()) : 
    null;

  return (
    <main className="container px-4 sm:px-6 max-w-4xl py-8 md:py-12">
      <Link href="/#case-studies">
        <Button variant="ghost" className="mb-4 md:mb-6 flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Case Studies</span>
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{caseStudy.title}</h1>
      
      {caseStudy.client && (
        <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">Client: {caseStudy.client}</p>
      )}
      
      {caseStudy.publishedAt && (
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          {format(new Date(caseStudy.publishedAt), 'MMMM d, yyyy')}
        </p>
      )}
      
      {imageUrl ? (
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-lg overflow-hidden mb-6 md:mb-8">
          <Image
            src={imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-full h-64 sm:h-80 md:h-[400px] bg-secondary flex items-center justify-center rounded-lg mb-6 md:mb-8">
          <p className="text-secondary-foreground text-base md:text-lg">
            {caseStudy.categories && caseStudy.categories[0] ? caseStudy.categories[0] : "Case Study"}
          </p>
        </div>
      )}
      
      {caseStudy.categories && caseStudy.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {caseStudy.categories.map((category: string) => (
            <span 
              key={category}
              className="px-2 md:px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      )}
      
      {caseStudy.body ? (
        <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
          <PortableText value={caseStudy.body} components={portableTextComponents} />
        </div>
      ) : (
        <p className="text-muted-foreground">No content available for this case study.</p>
      )}
    </main>
  )
} 