"use client"

import { useEffect, useState } from "react"
import RateCalculatorPopout from "@/components/rate-calculator-popout"
import { CalculatorModal } from "@/components/calculator-modal"

export function CalculatorPopupWrapper() {
  const [showPopup, setShowPopup] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false)

  useEffect(() => {
    // Check if popup was already dismissed in this session
    const dismissed = sessionStorage.getItem("calculator-popup-dismissed")
    if (dismissed) {
      setHasBeenDismissed(true)
      return
    }

    // Function to show popup after cookies are handled
    const showPopupAfterDelay = () => {
      setTimeout(() => {
        if (!sessionStorage.getItem("calculator-popup-dismissed")) {
          setShowPopup(true)
        }
      }, 3000) // 3-5 seconds delay as per requirements
    }

    // Check if cookies were already handled
    const cookiesAccepted = localStorage.getItem("cookies-accepted")
    if (cookiesAccepted !== null) {
      // Cookies already handled, show popup after delay
      showPopupAfterDelay()
    } else {
      // Wait for cookies to be handled
      const handleCookies = () => {
        showPopupAfterDelay()
      }

      window.addEventListener("cookies-handled", handleCookies)
      return () => {
        window.removeEventListener("cookies-handled", handleCookies)
      }
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    setHasBeenDismissed(true)
    sessionStorage.setItem("calculator-popup-dismissed", "true")
  }

  const handleCalculateClick = () => {
    setShowPopup(false)
    setShowCalculator(true)
    sessionStorage.setItem("calculator-popup-dismissed", "true")
  }

  if (hasBeenDismissed && !showCalculator) return null

  return (
    <>
      <RateCalculatorPopout
        isOpen={showPopup}
        onClose={handleClosePopup}
        onCalculateClick={handleCalculateClick}
      />
      <CalculatorModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </>
  )
}
