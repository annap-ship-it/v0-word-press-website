"use client"

import { useTheme } from "@/lib/theme-context"

export function HeroBanner() {
  const { theme } = useTheme()

  const darkBg = "/images/abbed7cf7d0bf82d9639274da7f0f3933a121818.png"
  const lightBg = "/images/1a42622a102e482b667a86696a3685a125ab0eea.png"

  return (
    <section
      className="hero-banner relative w-full mx-auto h-[838px] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${theme === "dark" ? darkBg : lightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-6 text-center flex flex-col items-center">
        {/* Main Title with specific typography */}
        <h1
          className="hero-title font-extrabold text-center mb-6"
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
          className="hero-subtitle text-center mb-4"
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
        <div className="hero-cta flex flex-col items-center gap-3">
          <button
            className="hero-button h-10 rounded-full px-7 font-normal transition-all duration-300 ease-out disabled:cursor-not-allowed"
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
            className="hero-button-desc text-center"
            style={{
              fontSize: "16px",
              lineHeight: "100%",
              fontWeight: 400,
              color: theme === "light" ? "#000000" : "#FFFFFF",
            }}
          >
            Get 10 hours of free tech expertise.
            <br />
            Test the fit from day one.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section flex items-center justify-center">
          <div className="stat-item text-center">
            <span
              className="block font-bold stat-number"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              25+
            </span>
            <span
              className="block mt-3 stat-label"
              style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              Estimations
            </span>
          </div>

          <div
            className="stat-divider w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="stat-item text-center">
            <span
              className="block font-bold stat-number"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              15+
            </span>
            <span
              className="block mt-3 stat-label"
              style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              Total Projects
            </span>
          </div>

          <div
            className="stat-divider w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="stat-item text-center">
            <span
              className="block font-bold stat-number"
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
            <span
              className="block mt-3 stat-label"
              style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              Successful Clients
            </span>
          </div>

          <div
            className="stat-divider w-px h-8"
            style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
          />

          <div className="stat-item text-center">
            <span
              className="block font-bold stat-number"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              20+
            </span>
            <span
              className="block mt-3 stat-label"
              style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              Professionals
            </span>
          </div>
        </div>

        <style jsx>{`
          /* Desktop default styles */
          .hero-banner {
            height: 838px;
          }
          
          .hero-title {
            width: 738px;
            margin-top: 197px;
            margin-bottom: 17px;
          }
          
          .hero-subtitle {
            width: 408px;
            margin-bottom: 148px;
          }
          
          .hero-cta {
            margin-bottom: 80px;
          }
          
          .hero-button-desc {
            width: 272px;
            margin-top: 15px;
          }
          
          .stats-section {
            max-width: 1116px;
            gap: 40px;
          }
          
          .stat-divider {
            display: block;
          }
          
          .stat-item {
            border-right: none;
          }

          /* Tablet: 768px and above - keep desktop styles */
          @media (min-width: 768px) {
            .hero-title {
              width: 738px;
              font-size: 64px !important;
            }
            
            .hero-subtitle {
              width: 408px;
            }
            
            .stats-section {
              max-width: 1116px;
              gap: 40px;
            }
          }

          /* Small mobile: 480px to 767px only */
          @media (min-width: 480px) and (max-width: 767px) {
            .hero-content {
              align-items: flex-start !important;
              padding: 0 28px !important;
              max-width: 480px !important;
            }
            
            .hero-banner {
              max-width: 480px;
              height: 718px !important;
            }
            
            .hero-title {
              width: 423px !important;
              height: 88px !important;
              font-size: 40px !important;
              line-height: 110% !important;
              margin-top: 166px !important;
              margin-left: 1px !important;
              margin-bottom: 24px !important;
              margin-right: auto !important;
              text-align: center !important;
            }
            
            .hero-subtitle {
              width: 408px !important;
              height: 52px !important;
              font-size: 20px !important;
              margin-bottom: 40px !important;
              margin-left: auto !important;
              margin-right: auto !important;
              text-align: center !important;
            }
            
            .hero-cta {
              margin-bottom: 97px !important;
              align-self: center !important;
            }
            
            .hero-button {
              width: 200px !important;
              height: 40px !important;
            }
            
            .hero-button-desc {
              width: 272px !important;
              height: 40px !important;
              text-align: center !important;
            }
            
            .stats-section {
              width: 424px !important;
              height: 80px !important;
              gap: 30px !important;
              flex-wrap: nowrap !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }
            
            .stat-item {
              width: 91px !important;
              height: 61px !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 10px !important;
              border-right: 1px solid ${theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"} !important;
              padding-right: 0 !important;
            }
            
            .stat-item:last-child {
              border-right: none !important;
            }
            
            .stat-divider {
              display: none !important;
            }
            
            .stat-number {
              font-size: 32px !important;
            }
            
            .stat-label {
              font-size: 14px !important;
              margin-top: 10px !important;
            }
          }

          /* Mobile below 480px - keep using 635px wide stats */
          @media (max-width: 479px) {
            .stats-section {
              width: 635px !important;
              gap: 0 !important;
            }
            
            .stat-item {
              width: 125px !important;
              height: 61px !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 10px !important;
              padding-right: 34px !important;
              border-right: 1px solid ${theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"} !important;
            }
            
            .stat-item:last-child {
              border-right: none !important;
              padding-right: 0 !important;
            }
            
            .stat-divider {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
