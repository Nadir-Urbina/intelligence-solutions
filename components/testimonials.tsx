import Image from "next/image"
import { getTestimonials } from "@/src/sanity/lib/client"
import { SanityImage } from "@/components/ui/optimized-image"
import Link from "next/link"

// Fallback testimonials data when none is available from Sanity
const fallbackTestimonials = [
  {
    _id: "fallback1",
    author: "Nedderman Construction Group",
    title: "Testimonial from Nedderman Construction",
    order: 1,
    companyLink: "https://nedderman.com",
    quote: "So blessed to have Tom Ledbetter of Intelligence Solutions and Wayland Henderson of MJM Coaching & Consulting partnering and advising Nedderman Construction Group to see our Vision for our Kingdom Business unfold and be realized seeing us grow from $20 Million a year in revenue to $30 Million this year."
  },
  {
    _id: "fallback2",
    author: "Heath Hill",
    title: "Lime Media; Kingdom Friendship🌍",
    order: 2,
    companyLink: "https://limemedia.com",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "I've been honored to be a small part of the God Story that is Lime Media these past 17 years. There's a better way to do business and it starts with making God the Chief Executive Officer."
  }
]

export default async function Testimonials() {
  let testimonials = []
  
  try {
    testimonials = await getTestimonials()
  } catch (error) {
    console.error("Error fetching testimonials:", error)
  }
  
  // Use fallback data if no testimonials are available from Sanity
  if (!testimonials || testimonials.length === 0) {
    testimonials = fallbackTestimonials
  }

  // Helper function to get YouTube or Vimeo embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return null
    
    // YouTube URL conversion
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extract video ID
      let videoId = ''
      if (url.includes('v=')) {
        videoId = url.split('v=')[1]
        const ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition)
        }
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]
      }
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com')) {
      const vimeoId = url.split('vimeo.com/')[1]
      return `https://player.vimeo.com/video/${vimeoId}`
    }
    
    // If already an embed URL or other provider, return as is
    return url
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Client Testimonials
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it — hear what our clients have to say about their experiences working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial: any) => (
            <div
              key={testimonial._id}
              className="bg-background rounded-lg p-5 sm:p-8 shadow-sm flex flex-col h-full"
            >
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                    {testimonial.image && testimonial.image.asset ? (
                      <SanityImage
                        image={testimonial.image}
                        alt={testimonial.author || 'Client'}
                        fill
                        sizes="50px"
                        className="object-cover"
                        wrapperClassName="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center relative">
                        <Image 
                          src="/placeholder-user.jpg"
                          alt={testimonial.author || 'Client'}
                          fill
                          className="object-cover opacity-40"
                        />
                        <span className="text-primary font-medium absolute z-10">
                          {testimonial.author && testimonial.author.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="font-semibold text-sm sm:text-base">{testimonial.author || 'Client'}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.title || ''}
                    </p>
                    {testimonial.companyLink && (
                      <a 
                        href={testimonial.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {testimonial.videoLink ? (
                <div className="flex-1 w-full relative pb-[56.25%] h-0">
                  <iframe
                    src={getEmbedUrl(testimonial.videoLink)}
                    title={`Video testimonial from ${testimonial.author}`}
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <blockquote className="flex-1 italic text-sm sm:text-base text-muted-foreground">
                  "{testimonial.quote || 'No testimonial provided'}"
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

