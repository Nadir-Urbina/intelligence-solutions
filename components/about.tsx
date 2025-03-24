"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div ref={ref} className="container max-w-4xl mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className={`space-y-6 transition-all duration-700 delay-300 ${isInView ? "opacity-100" : "opacity-0"}`}>
          <p className="text-lg">
            Throughout our journey with God we've always served bi-vocationally in the marketplace and the church. This
            has had it's ups and downs but we learned to trust that God doesn't separate the two as they are both
            ministries unto Him. Looking back it all makes perfect sense that we were being prepared to see kingdom
            culture brought into the marketplace.
          </p>

          <p className="text-lg">
            What does it look like when a marketplace leader gets empowered to build enterprise as a calling? What does
            it look like to see faith in the workplace in practical and impactful ways? What does it look like for every
            day employees serving God with their work that becomes worship to the King? What does community look like in
            the marketplace of every day believer on mission with their trade?
          </p>

          <p className="text-lg">
            In 2022 we formed a for-profit called Intelligence Solutions that solidified what we've been doing for years
            in seeing these questions answered. We've seen what it looks like to cultivate kingdom culture in the
            marketplace and the results have been remarkable.
          </p>

          <p className="text-lg font-medium">
            What would your business on mission look like? There's just nothing like a business being put in the hands
            of the Chief CEO.
          </p>

          <p className="text-lg">
            God is an incredible business leader and He's calling on business people to make His Name great in the
            Marketplace. He is in the business of blurring the lines and so are we.
          </p>

          <p className="text-lg">We look forward to sharing more from this space.</p>
        </div>
      </div>
    </section>
  )
}

