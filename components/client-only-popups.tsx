'use client'

import dynamic from 'next/dynamic'

// Dynamic import for calculator popup to reduce initial bundle
const CalculatorPopup = dynamic(() => import('@/components/calculator-popup').then(mod => ({ default: mod.CalculatorPopup })), {
  ssr: false,
  loading: () => null,
})

export function ClientOnlyPopups() {
  return <CalculatorPopup />
}
