"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getContactInfo } from "@/src/sanity/lib/client"

// Fallback contact information
const fallbackContactInfo = {
  email: "info@intelligencesolutions.com",
  phone: "(555) 123-4567",
  location: "Dallas, Texas",
  description: "We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible."
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch contact information from Sanity
  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const data = await getContactInfo()
        if (data) {
          setContactInfo({
            email: data.email || fallbackContactInfo.email,
            phone: data.phone || fallbackContactInfo.phone,
            location: data.location || fallbackContactInfo.location,
            description: data.description || fallbackContactInfo.description
          })
        }
      } catch (error) {
        console.error("Error fetching contact info:", error)
        // On error, ensure we're using the fallback data
        setContactInfo(fallbackContactInfo)
      }
    }
    
    fetchContactInfo()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form submission logic
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      // Success message
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll be in touch soon!",
      })
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (error) {
      // Error message
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div ref={ref} className="container px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with kingdom principles? Get in touch with us today.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div
            className={`transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Get In Touch</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8">
              {contactInfo.description}
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Email</h4>
                  <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Phone</h4>
                  <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Location</h4>
                  <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" value={formState.company} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

