"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "So blessed to have Tom Ledbetter of Intelligence Solutions and Wayland Henderson of MJM Coaching & Consulting partnering and advising Nedderman Construction Group to see our Vision for our Kingdom Business unfold and be realized seeing us grow from $20 Million a year in revenue to $30 Million this year. The Lord spoke to us in a dream that Acceleration was coming to us from him. Tom and Wayland have been such a catlyst to seeing that dream and vision unfold for us over the last year! We have only just begun to step into where the Lord Jesus is taking us in the Kingdom Business Arena! 🙌🔥🕊🙏",
    author: "Nedderman Construction Group",
    title: "Testimonial from Nederman Construction",
  },
  {
    quote:
      "I've been honored to be a small part of the God Story that is Lime Media these past 17 years. Watching my friend Heath follow God's blueprint in all these seasons has been a rich process of seeing blessed surrender. There's a better way to do business and it starts with making God the Chief Executive Officer. \"Live your BEST life and choose FAITH, not FEAR.\"",
    author: "Heath Hill",
    title: "Lime Media; Kingdom Friendship🌍",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses we've helped transform through kingdom principles.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`transition-all duration-700 delay-${index * 200} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{testimonial.title}</h3>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <p className="font-medium">— {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

