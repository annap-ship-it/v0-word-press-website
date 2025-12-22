"use client"

import { useTheme } from "@/lib/theme-context"

export function HeroBanner() {
  const { theme } = useTheme()

  const darkBg = "/images/abbed7cf7d0bf82d9639274da7f0f3933a121818.png"
  const lightBg = "/images/1a42622a102e482b667a86696a3685a125ab0eea.png"

  return (
    <section
      className="hero-banner relative w-full mx-auto h-[838px] md:h-[838px] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${theme === "dark" ? darkBg : lightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-6 text-center md:px-[15px]">
        {/* Main Title with specific typography */}
        <h1
          className="font-extrabold text-center mb-6 mt-[65px] md:w-[738px] md:mx-auto md:mt-[197px] md:mb-4"
          style={{
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: "-3%",
            fontWeight: 800,
            color: theme === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          Turning your idea into
          <br />a{" "}
          <span
            style={{
              backgroundImage:
                theme === "light"
                  ? "linear-gradient(90deg, #FF6200 51.44%, #212121 100%)"
                  : "linear-gradient(90deg, #FF6200 51.44%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            tech solution
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white text-center mb-4 md:w-[408px] md:mx-auto md:mt-[17px]"
          style={{
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "2%",
            fontWeight: 500,
            color: theme === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          You don&apos;t need better developers.
          <br />
          You need the right ones at the right time.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-3 md:mt-[148px]" style={{ marginTop: "calc(2rem + 65px)" }}>
          <button
            className="h-10 rounded-full px-7 font-normal transition-all duration-300 ease-out disabled:cursor-not-allowed md:w-[200px] md:h-[40px]"
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "50px",
              padding: "4px 14px",
              fontSize: "16px",
              lineHeight: "100%",
              fontFamily: "Onest",
              fontWeight: 400,
              letterSpacing: "0%",
              background: "#FF6200",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "#FF6200"
              }
            }}
            onMouseDown={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)"
              }
            }}
            onMouseUp={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
              }
            }}
            disabled={false}
          >
            Developer Test Drive
          </button>

          <p
            className="text-white/80 text-center md:w-[272px] md:h-[40px] md:mt-[15px]"
            style={{
              fontSize: "16px",
              lineHeight: "100%",
              fontWeight: 400,
              paddingTop: "15px",
              color: theme === "light" ? "#000000" : "#FFFFFF",
            }}
          >
            Get 10 hours of free tech expertise.
            <br />
            Test the fit from day one.
          </p>
        </div>

        {/* Stats Section */}
        <div
          className="stats-section flex items-center justify-center mt-20"
          style={{
            maxWidth: "1116px",
            height: "auto",
            gap: "40px",
            margin: "80px auto 0",
          }}
        >
          <div className="text-center">
            <span
              className="block font-bold"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              25+
            </span>
            <span className="block mt-3" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
              Estimations
            </span>
          </div>

          <div
            className="w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="text-center">
            <span
              className="block font-bold"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              15+
            </span>
            <span className="block mt-3" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
              Total Projects
            </span>
          </div>

          <div
            className="w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="text-center">
            <span
              className="block font-bold"
              style={{
                fontSize: "32px",
                ...(theme === "light"
                  ? { color: "#212121" }
                  : {
                      backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #FF6200 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }),
              }}
            >
              10+
            </span>
            <span className="block mt-3" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
              Successful Clients
            </span>
          </div>

          <div
            className="w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="text-center">
            <span
              className="block font-bold"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              20+
            </span>
            <span className="block mt-3" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
              Professionals
            </span>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 767px) {
            .stats-section {
              width: 635px !important;
              gap: 0 !important;
              margin-top: 80px !important;
            }
            .stats-section > div:not(.w-px) {
              width: 125px !important;
              height: 61px !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 10px !important;
              padding-right: 34px !important;
              border-right: 1px solid ${theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"} !important;
            }
            .stats-section > div:last-child {
              border-right: none !important;
              padding-right: 0 !important;
            }
            .stats-section > div.w-px {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
