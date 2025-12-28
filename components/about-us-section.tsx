"use client"
import { WorldMapWithHover } from "./world-map-with-hover"

type Pin = {
  x: number
  y: number
}

const pins: Pin[] = [
  { x: 163, y: 194 }, // Western Canada
  { x: 370, y: 243 }, // United Kingdom
  { x: 359, y: 244 }, // Netherlands
  { x: 409, y: 239 }, // Belgium
  { x: 380, y: 223 }, // Germany
  { x: 397, y: 212 }, // Poland
  { x: 407, y: 212 }, // Ukraine
]

export function AboutUsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">About Us</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Born in 2023, a young IT studio that expands its operational reach with every project, uniting
              international talent around your idea.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Our team of middle+ engineers helps companies launch faster and scale with confidence. We've streamlined
              every step from request to delivery to cut delays, raise quality, and ensure full accountability.
            </p>
          </div>

          {/* Right: Interactive Map */}
          <div className="relative">
            <div className="relative w-full" style={{ aspectRatio: "755/443" }}>
              <div className="absolute inset-0">
                <WorldMapWithHover />
              </div>

              <svg viewBox="0 0 755 443" className="absolute inset-0 w-full h-full pointer-events-none">
                <g className="pins-layer">
                  {pins.map((pin, i) => (
                    <image
                      key={i}
                      href="/images/location-pin.svg"
                      x={pin.x - 8}
                      y={pin.y - 20}
                      width="16"
                      height="20"
                      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
