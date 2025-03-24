"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, TrendingUp, Target, Briefcase, HeartHandshake } from "lucide-react"

const services = [
  {
    title: "Business Strategy",
    description: "Develop a kingdom-focused business strategy that aligns with your mission and values.",
    icon: <Target className="h-10 w-10" />,
  },
  {
    title: "Leadership Development",
    description: "Cultivate leadership skills that integrate faith principles in the workplace.",
    icon: <Users className="h-10 w-10" />,
  },
  {
    title: "Organizational Culture",
    description: "Build a thriving workplace culture that honors God and empowers employees.",
    icon: <HeartHandshake className="h-10 w-10" />,
  },
  {
    title: "Growth Consulting",
    description: "Strategic guidance to accelerate your business growth with kingdom principles.",
    icon: <TrendingUp className="h-10 w-10" />,
  },
  {
    title: "Vision Clarification",
    description: "Clarify and articulate your business vision aligned with kingdom values.",
    icon: <Lightbulb className="h-10 w-10" />,
  },
  {
    title: "Marketplace Ministry",
    description: "Integrate faith and business in practical, impactful ways that honor your calling.",
    icon: <Briefcase className="h-10 w-10" />,
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer specialized services to help your business thrive with kingdom principles at its core.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <CardHeader>
                <div className="mb-4 text-primary">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

