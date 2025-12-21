"use client"

import { useTheme } from "@/lib/theme-context"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between transition-colors duration-300"
      style={{
        width: "64px",
        height: "40px",
        borderRadius: "100px",
        background: "transparent",
        padding: 0,
      }}
      aria-label="Toggle theme"
    >
      <div
        className="absolute transition-all duration-300"
        style={{
          width: "36px",
          height: "18px",
          top: "11px",
          left: isDark ? "14px" : "14px",
          borderRadius: "100px",
          background: isDark ? "#000000" : "#FFFFFF",
          boxShadow: isDark ? "0px 0px 4.4px -1px #FF6200" : "0px 0px 4.4px -1px #FF6200",
        }}
      >
        {isDark && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: "4px",
              left: "4px",
            }}
          >
            <path
              d="M8.63636 5L9 5M5.00005 1.36364V1M5.00005 9V8.63636M7.90919 7.90909L7.54556 7.54545M7.90919 2.09091L7.54556 2.45454M2.09091 7.90909L2.45455 7.54545M2.09091 2.09091L2.45455 2.45454M1 5L1.36364 5M7.18187 5C7.18187 6.20499 6.20499 7.22222 5 7.22222C3.79501 7.22222 2.81823 6.20499 2.81823 5C2.81823 3.79501 3.79507 2.81818 5.00005 2.81818C6.20504 2.81818 7.18187 3.79501 7.18187 5Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {!isDark && (
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: "4px",
              left: "22px",
            }}
          >
            <path
              d="M8.5 4.86037C8.42994 5.61851 8.14541 6.34102 7.6797 6.94336C7.214 7.5457 6.58638 8.00295 5.87029 8.2616C5.1542 8.52026 4.37925 8.56963 3.63613 8.40393C2.893 8.23823 2.21244 7.86432 1.67406 7.32594C1.13569 6.78757 0.76178 6.10701 0.596081 5.36388C0.430382 4.62076 0.479749 3.84581 0.738406 3.12972C0.997063 2.41363 1.45431 1.78601 2.05665 1.3203C2.65898 0.8546 3.3815 0.57007 4.13964 0.500008C3.69577 1.10051 3.48218 1.84038 3.53771 2.58506C3.59324 3.32973 3.91421 4.02974 4.44224 4.55777C4.97026 5.0858 5.67027 5.40677 6.41495 5.4623C7.15962 5.51783 7.8995 5.30424 8.5 4.86037Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <div
          className="absolute rounded-full"
          style={{
            width: "10px",
            height: "10px",
            top: "4px",
            left: isDark ? "22px" : "4px",
            background: "#FF6200",
          }}
        />
      </div>
    </button>
  )
}
