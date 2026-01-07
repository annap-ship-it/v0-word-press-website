"use client"

import { useTheme } from "@/lib/theme-context"
import { useState } from "react"
import RateCalculatorPopout from "./rate-calculator-popout"
import CalculatorModal from "./calculator-modal"
import LiquidEther from "./liquid-ether"

export function HeroBanner() {
  const { theme } = useTheme()
  const [isPopoutOpen, setIsPopoutOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  const handleCalculateClick = () => {
    setIsPopoutOpen(false)
    setTimeout(() => {
      setIsCalculatorOpen(true)
    }, 100)
  }

  return (
    <>
      <section className="hero-banner relative w-full mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <LiquidEther
            colors={theme === "dark" ? ["#FF6200", "#FFFFFF", "#FFB43F"] : ["#FF6200", "#000000", "#FFA57D"]}
            autoIntensity={2.4}
            autoDemo={true}
            autoSpeed={0.5}
          />
        </div>

        <div className="hero-content relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-6 text-center md:px-[15px] flex flex-col justify-center py-8 md:py-12 items-center h-max">
          <h1
            className="hero-title font-extrabold text-center mb-4 md:mb-6 md:w-[738px] md:mx-auto lg:mt-20 xl:mt-24 leading-4 mt-40 px-2"
            style={{
              fontSize: "64px",
              lineHeight: "110%",
              letterSpacing: "-3%",
              fontWeight: 800,
              color: theme === "light" ? "#000000" : "#FFFFFF",
              marginTop: "197px",
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
              onClick={() => setIsPopoutOpen(true)}
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

          <div
            className="stats-section flex flex-col w-full px-4 gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:flex-nowrap items-center justify-center mt-12 md:mt-16"
            style={{
              maxWidth: "1116px",
              height: "auto",
              margin: "48px auto 0",
            }}
          >
            <div className="flex items-center gap-4 w-full sm:w-auto justify-start sm:justify-center">
              <div className="text-center flex-1 sm:flex-none">
                <span
                  className="block font-bold"
                  style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  25+
                </span>
                <span
                  className="block mt-0"
                  style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  Estimations
                </span>
              </div>

              <div
                className="w-px h-12 sm:h-8"
                style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
              />

              <div className="text-center flex-1 sm:flex-none">
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
                <span
                  className="block mt-0"
                  style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  Total Projects
                </span>
              </div>
            </div>

            <div
              className="hidden md:block w-px h-8"
              style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
            />

            <div className="flex items-center gap-4 w-full sm:w-auto justify-start sm:justify-center">
              <div className="text-center flex-1 sm:flex-none">
                <span
                  className="block font-bold"
                  style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  10+
                </span>
                <span
                  className="block mt-0"
                  style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  Successful Clients
                </span>
              </div>

              <div
                className="w-px h-12 sm:h-8"
                style={{ backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}
              />

              <div className="text-center flex-1 sm:flex-none">
                <span
                  className="block font-bold"
                  style={{ fontSize: "32px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  20+
                </span>
                <span
                  className="block mt-0"
                  style={{ fontSize: "16px", color: theme === "light" ? "#000000" : "#FFFFFF" }}
                >
                  Professionals
                </span>
              </div>
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
                margin-top: 200px !important;
                font-size: 36px !important;
                line-height: 110% !important;
                width: 100% !important;
                max-width: 100% !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-bottom: 24px !important;
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
                margin-top: 166px !important;
                font-size: 40px !important;
                line-height: 110% !important;
                width: 100% !important;
                max-width: 423px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-bottom: 24px !important;
              }
            }

            @media (min-width: 768px) and (max-width: 1023px) {
              .hero-banner {
                min-height: 100vh !important;
              }
              
              .hero-content {
                padding: 0 40px !important;
              }
              
              .hero-title {
                margin-top: 180px !important;
                font-size: 52px !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) {
              .hero-banner {
                min-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 140px !important;
                font-size: 56px !important;
              }
            }
            
            @media (min-width: 1280px) and (max-width: 1439px) {
              .hero-banner {
                max-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 120px !important;
                font-size: 60px !important;
              }
            }
            
            @media (min-width: 1440px) {
              .hero-banner {
                max-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 160px !important;
                font-size: 64px !important;
              }
            }
          `}</style>
        </div>
      </section>

      <RateCalculatorPopout
        isOpen={isPopoutOpen}
        onClose={() => setIsPopoutOpen(false)}
        onCalculateClick={handleCalculateClick}
      />

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  )
}
