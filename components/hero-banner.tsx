"use client"

import { useTheme } from "@/lib/theme-context"

export function HeroBanner() {
  const { theme } = useTheme()

  const darkBg = "/images/abbed7cf7d0bf82d9639274da7f0f3933a121818.png"
  const lightBg = "/images/1a42622a102e482b667a86696a3685a125ab0eea.png"

  return (
    <section
      className="hero-banner relative w-full mx-auto min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${theme === "dark" ? darkBg : lightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-6 text-center md:px-[15px] flex flex-col justify-center py-8 md:py-12 items-center h-max">
        {/* Main Title with specific typography */}
        <h1
          className="hero-title font-extrabold text-center mb-4 md:mb-6 md:w-[738px] md:mx-auto lg:mt-20 xl:mt-24 leading-4 mt-40 px-2"
          style={{
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: "-3%",
            fontWeight: 800,
            color: theme === "light" ? "#000000" : "#FFFFFF",
            marginTop: "197px", // Fixed margin-top to marginTop (camelCase for inline styles)
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
          className="text-white text-center mb-4 md:w-[408px] md:mx-auto md:mt-4"
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
        <div className="flex flex-col items-center gap-3 mt-8 md:mt-12">
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
            className="text-white/80 text-center md:w-[272px] md:h-[40px] md:mt-[15px] opacity-60"
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
          className="stats-section flex items-center justify-center mt-12 md:mt-16"
          style={{
            maxWidth: "1116px",
            height: "auto",
            gap: "40px",
            margin: "48px auto 0",
          }}
        >
          <div className="text-center">
            <span
              className="block font-bold"
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              25+
            </span>
            <span className="block mt-0" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
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
              15+
            </span>
            <span className="block mt-0" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
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
              style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
            >
              10+
            </span>
            <span className="block mt-0" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
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
            <span className="block mt-0" style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}>
              Professionals
            </span>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 479px) {
            .hero-banner {
              height: auto !important;
              min-height: 100vh !important;
              max-height: none !important;
              overflow: visible !important;
              padding-bottom: 60px !important;
            }
            
            .hero-content {
              padding: 0 20px 0 !important;
              height: auto !important;
              min-height: auto !important;
            }
            
            .hero-title {
              marginTop: 200px !important; // Fixed margin-top to marginTop (camelCase for inline styles)
              fontSize: 36px !important;
              lineHeight: 110% !important;
              width: 100% !important;
              maxWidth: 100% !important;
              marginLeft: auto !important;
              marginRight: auto !important;
              marginBottom: 24px !important;
            }
            
            .hero-title + p {
              width: 100% !important;
              maxWidth: 100% !important;
              fontSize: 18px !important;
              marginBottom: 32px !important;
            }
            
            .stats-section {
              width: 100% !important;
              maxWidth: 100% !important;
              margin: 40px auto 0 !important;
              padding: 0 20px !important;
              display: grid !important;
              gridTemplateColumns: "repeat(2, 1fr) !important";
              gap: "20px 30px !important";
              alignItems: "start !important";
            }
            
            .stats-section > div:not(.w-px) {
              width: 100% !important;
              maxWidth: none !important;
              display: flex !important;
              flexDirection: "column !important";
              alignItems: "center !important";
              gap: "4px !important";
            }
            
            .stats-section > div.w-px {
              display: "none !important";
            }
            
            .stats-section span:first-child {
              fontSize: "28px !important";
            }
            
            .stats-section span:last-child {
              fontSize: "13px !important";
            }
          }
          
          @media (min-width: 480px) and (max-width: 767px) {
            .hero-banner {
              height: auto !important;
              min-height: 100vh !important;
              max-height: none !important;
              overflow: visible !important;
              padding-bottom: 60px !important;
            }
            
            .hero-content {
              padding: 0 28px 0 !important;
              height: auto !important;
              min-height: auto !important;
            }
            
            .hero-title {
              marginTop: 166px !important; // Fixed margin-top to marginTop (camelCase for inline styles)
              fontSize: "40px !important";
              lineHeight: "110% !important";
              width: "100% !important";
              maxWidth: "423px !important";
              marginLeft: "auto !important";
              marginRight: "auto !important";
              marginBottom: "24px !important";
            }
            
            .hero-title + p {
              width: "100% !important";
              maxWidth: "100% !important";
              fontSize: "20px !important";
              marginBottom: "40px !important";
            }
            
            .stats-section {
              width: "100% !important";
              maxWidth: "440px !important";
              margin: "48px auto 0 !important";
              padding: "0 20px !important";
              display: "grid !important";
              gridTemplateColumns: "repeat(2, 1fr) !important";
              gap: "20px 40px !important";
              alignItems: "start !important";
            }
            
            .stats-section > div:not(.w-px) {
              width: "100% !important";
              maxWidth: "none !important";
              display: "flex !important";
              flexDirection: "column !important";
              alignItems: "center !important";
              gap: "4px !important";
            }
            
            .stats-section > div.w-px {
              display: "none !important";
            }
            
            .stats-section span:first-child {
              fontSize: "32px !important";
            }
            
            .stats-section span:last-child {
              fontSize: "14px !important";
            }
          }

          @media (min-width: 768px) and (max-width: 1023px) {
            .hero-banner {
              minHeight: "100vh !important";
            }
            
            .hero-content {
              padding: "0 40px !important";
            }
            
            .hero-title {
              marginTop: "180px !important";
              fontSize: "52px !important";
            }
            
            .hero-title + p {
              fontSize: "20px !important";
            }
            
            .stats-section {
              display: "flex !important";
              flexDirection: "row !important";
              marginTop: "64px !important";
              marginBottom: "48px !important";
              gap: "30px !important";
            }
          }
          
          @media (min-width: 1024px) and (max-width: 1279px) {
            .hero-banner {
              minHeight: "100vh !important";
            }
            
            .hero-title {
              marginTop: "140px !important";
              fontSize: "56px !important";
            }
            
            .stats-section {
              display: "flex !important";
              flexDirection: "row !important";
              marginTop: "72px !important";
              gap: "35px !important";
            }
          }
          
          @media (min-width: 1280px) and (max-width: 1439px) {
            .hero-banner {
              maxHeight: "100vh !important";
            }
            
            .hero-title {
              marginTop: "120px !important";
              fontSize: "60px !important";
            }
            
            .stats-section {
              display: "flex !important";
              flexDirection: "row !important";
              marginTop: "80px !important";
            }
          }
          
          @media (min-width: 1440px) {
            .hero-banner {
              maxHeight: "100vh !important";
            }
            
            .hero-title {
              marginTop: "160px !important";
              fontSize: "64px !important";
            }
            
            .stats-section {
              display: "flex !important";
              flexDirection: "row !important";
              marginTop: "96px !important";
            }
          }
        `}</style>
      </div>
    </section>
  )
}
