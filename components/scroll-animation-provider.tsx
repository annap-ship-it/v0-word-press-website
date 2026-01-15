"use client"

import type { ReactNode } from "react"
import { useScrollAnimateElements } from "@/hooks/use-scroll-animate-elements"

export function ScrollAnimationProvider({ children }: { children: ReactNode }) {
  useScrollAnimateElements()

  return <>{children}</>
}
