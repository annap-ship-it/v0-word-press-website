"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface BlogPost {
  slug: string
  title: string
}

export function Footer() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const supabase = createBrowserClient()

      const { data, error } = await supabase
        .from("posts")
        .select("slug, title")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setLatestPosts(data)
      }
    }

    fetchLatestPosts()
  }, [])

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background: "linear-gradient(147.3deg, #2A2929 46.71%, #37271D 95.83%)",
      }}
    >
      <div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] opacity-[0.03] pointer-events-none"
        style={{
          bottom: "calc(var(--spacing, 1rem) * 16)",
          right: "calc(var(--spacing, 1rem) * 16)",
        }}
      >
        <svg
          width="627"
          height="541"
          viewBox="0 0 627 541"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        >
          <path
            d="M569.578 540.098L511.151 539.699L439.241 417.63L516.058 282.331L619.475 457.936C641.121 494.703 613.375 540.363 569.532 540.053L569.578 540.098Z"
            fill="#FFFFFF"
          />
          <path
            d="M120.556 537.134L56.6721 536.692C12.7831 536.426 -14.2748 490.412 7.92187 453.911L126.656 258.617L204.069 390.022L120.556 537.09V537.134Z"
            fill="#FFFFFF"
          />
          <path d="M230.805 342.976L154.309 213.119L210.213 121.18L284.829 247.807L230.805 342.976Z" fill="#FFFFFF" />
          <path
            d="M316.748 538.403H313.125L291.387 538.226L174.304 537.474L231.538 436.686L258.229 389.61L312.253 294.485L338.99 247.453L237.867 75.786L267.401 27.1617C289.552 -9.33973 344.402 -8.98577 366.094 27.8254L488.589 235.773L411.772 371.072L385.035 418.103L331.011 513.228L316.702 538.447L316.748 538.403Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Top section with logo, contact, and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 pb-12">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/logo-dark.svg" alt="IdeaTeam" width={140} height={22} />
            </Link>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                  <path
                    d="M10 10.625C11.0355 10.625 11.875 9.78553 11.875 8.75C11.875 7.71447 11.0355 6.875 10 6.875C8.96447 6.875 8.125 7.71447 8.125 8.75C8.125 9.78553 8.96447 10.625 10 10.625Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.25 8.75C16.25 14.375 10 18.125 10 18.125C10 18.125 3.75 14.375 3.75 8.75C3.75 7.09239 4.40848 5.50268 5.58058 4.33058C6.75268 3.15848 8.34239 2.5 10 2.5C11.6576 2.5 13.2473 3.15848 14.4194 4.33058C15.5915 5.50268 16.25 7.09239 16.25 8.75V8.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[#CCCCCC] text-sm leading-[140%]">
                  Ukraine, Chernihiv,
                  <br />
                  Instrumentalna Street, 24
                </p>
              </div>

              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path
                    d="M7 9L12 12.5L17 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
                <a
                  href="mailto:sales@ideateam.dev"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  sales@ideateam.dev
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-5">
            <h4 className="text-white font-semibold text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Our experience
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-base mb-4">Projects</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/projects/multi-brand-ecommerce"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Multi-brand eCommerce Landing Pages
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/statistics-platform"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Statistics Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/sensor-infobox"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Sensor Infobox
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/ecommerce-platform"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  High-performance eCommerce platform
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Link
              href="/services"
              className="text-white font-semibold text-base mb-4 block hover:text-[#FF6200] transition-colors duration-300"
            >
              Services
            </Link>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#custom-web-solutions"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Custom web solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services#mobile-applications"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Mobile applications
                </Link>
              </li>
              <li>
                <Link
                  href="/services#ux-ui-design"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  UI/UX and Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services#qa"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Manual and Automation QA
                </Link>
              </li>
              <li>
                <Link
                  href="/services#devops"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  DevOps
                </Link>
              </li>
              <li>
                <Link
                  href="/services#data-analytics"
                  className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                >
                  Data Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-base mb-4">Blog</h4>
            <ul className="space-y-3">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300 line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    href="/blog"
                    className="text-[#CCCCCC] text-sm hover:text-[#FF6200] transition-colors duration-300"
                  >
                    View all posts
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Combined Social Icons and Rating Badges - Desktop: 1 horizontal row, Mobile: 2 separate grid sections */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-4 gap-8">
          {/* Social Icons - Mobile: 3 columns grid, Desktop: horizontal row */}
          <div className="grid grid-cols-3 md:flex md:flex-row md:gap-3 gap-4 justify-items-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M9 1H6.5C5.57174 1 4.6815 1.36875 4.02513 2.02513C3.36875 2.6815 3 3.57174 3 4.5V7H0.5V10.5H3V17H6.5V10.5H9L9.5 7H6.5V4.5C6.5 4.36739 6.55268 4.24021 6.64645 4.14645C6.74021 4.05268 6.86739 4 7 4H9.5L9 1Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M4.30556 13.1944V6.97222M7.86111 10.3056V6.97222M7.86111 10.3056C7.86111 6.97222 13.1944 6.97222 13.1944 10.3056V13.1944M7.86111 10.3056V13.1944M4.30556 4.31444L4.31444 4.30457M16.75 12.3056V5.19444C16.75 2.73985 14.7602 0.75 12.3056 0.75H5.19444C2.73985 0.75 0.75 2.73985 0.75 5.19444V12.3056C0.75 14.7602 2.73985 16.75 5.19444 16.75H12.3056C14.7602 16.75 16.75 14.7602 16.75 12.3056Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M12.6 0H15.054L9.694 5.93021L16 14H11.063L7.196 9.10483L2.771 14H0.316L6.049 7.65655L0 0H5.063L8.558 4.47324L12.6 0ZM11.74 12.5788H13.1L4.323 1.3469H2.865L11.74 12.5788Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M13.6389 3.87L13.6478 3.86012M12.3056 8.75C12.3056 10.7137 10.7137 12.3056 8.75 12.3056C6.78632 12.3056 5.19444 10.7137 5.19444 8.75C5.19444 6.78632 6.78632 5.19444 8.75 5.19444C10.7137 5.19444 12.3056 6.78632 12.3056 8.75ZM0.75 5.19444V12.3056C0.75 14.7602 2.73985 16.75 5.19444 16.75H12.3056C14.7602 16.75 16.75 14.7602 16.75 12.3056V5.19444C16.75 2.73985 14.7602 0.75 12.3056 0.75H5.19444C2.73985 0.75 0.75 2.73985 0.75 5.19444Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M20.7501 0.75L0.750061 8.75L8.11848 9.81667M20.7501 0.75L18.1185 16.75L8.11848 9.81667M20.7501 0.75L8.11848 9.81667M8.11848 9.81667V15.6833L11.5383 12.1877"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:opacity-100 opacity-60 transition-opacity duration-300"
              >
                <path
                  d="M15.6588 12.9204V14.2342C15.6593 14.3562 15.6312 14.4769 15.5761 14.5887C15.521 14.7004 15.4402 14.8007 15.3389 14.8832C15.2376 14.9656 15.118 15.0284 14.9878 15.0675C14.8575 15.1065 14.7195 15.1211 14.5826 15.1101C13.0636 14.9637 11.6044 14.5032 10.3224 13.7656C9.12961 13.0932 8.11837 12.1961 7.36044 11.138C6.52615 9.99552 6.00696 8.69476 5.84492 7.34111C5.83258 7.22 5.8488 7.09795 5.89255 6.98271C5.9363 6.86747 6.00662 6.76158 6.09903 6.67177C6.19144 6.58197 6.30392 6.51021 6.4293 6.46108C6.55468 6.41195 6.69022 6.38652 6.82729 6.38641H8.30826C8.54783 6.38431 8.78009 6.45958 8.96174 6.59816C9.14339 6.73675 9.26204 6.9292 9.29557 7.13966C9.35808 7.5601 9.474 7.97293 9.64113 8.37025C9.70755 8.527 9.72192 8.69735 9.68255 8.86113C9.64318 9.0249 9.55171 9.17523 9.41898 9.2943L8.79204 9.85048C9.49479 10.9469 10.5181 11.8547 11.754 12.4781L12.3809 11.9219C12.5151 11.8042 12.6846 11.723 12.8692 11.6881C13.0538 11.6532 13.2458 11.6659 13.4225 11.7248C13.8704 11.8731 14.3358 11.9759 14.8097 12.0314C15.0495 12.0614 15.2685 12.1686 15.4251 12.3325C15.5816 12.4964 15.6648 12.7056 15.6588 12.9204Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 12.5714 1.23697 14.2791 2.08782 15.75L1.25 20.25L5.75 19.4122C7.22087 20.263 8.92856 20.75 10.75 20.75Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Rating Badges - Mobile: 2 columns grid, Desktop: horizontal row */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:gap-4 gap-4">
            {/* Sortlist Badge */}
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#3A3A3A] rounded hover:bg-[#333333] active:bg-[#404040] transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 0V24H0V0H24ZM17.4667 6H15.4133V18H17.4667V6ZM9.94107 8.72773C8.27147 8.84267 6.80027 9.90053 6.9336 11.7195C7.096 13.936 9.84747 13.848 11.316 14.5637C12.3515 15.0683 12.0515 16.1029 11.0091 16.3291C9.8248 16.5859 8.37893 15.9891 7.4264 15.3091L6.536 16.676C8.11227 18 11.2568 18.6037 12.9459 17.2259C13.7581 16.5635 14.0835 15.4736 13.7936 14.4597C13.3245 12.8195 11.0613 12.6259 9.71947 12.1072C9.20693 11.9091 8.71307 11.6739 8.92587 11.0192C9.05893 10.6101 9.5192 10.4184 9.9144 10.3544C10.916 10.1923 12.0029 10.6965 12.8405 11.1971L13.6467 9.79973C12.6059 9.0752 11.2181 8.64 9.94107 8.728V8.72773Z"
                  fill="black"
                />
                <path
                  d="M9.94108 8.72999C11.2181 8.64199 12.6059 9.07719 13.6467 9.80173L12.8405 11.1991C12.0029 10.6985 10.916 10.1945 9.91441 10.3564C9.51921 10.4204 9.05894 10.6121 8.92588 11.0212C8.71308 11.6756 9.20694 11.9111 9.71948 12.1092C11.0611 12.6279 13.3245 12.8215 13.7936 14.4617C14.0835 15.4756 13.7581 16.5655 12.9459 17.2279C11.2568 18.6057 8.11228 18.002 6.53601 16.678L7.42641 15.3111C8.37894 15.9911 9.82481 16.5879 11.0091 16.3311C12.0515 16.1049 12.3515 15.0703 11.316 14.5657C9.84721 13.85 7.09601 13.9383 6.93361 11.7215C6.80028 9.90253 8.27148 8.84466 9.94108 8.72973V8.72999Z"
                  fill="white"
                />
                <path d="M17.4664 6H15.4131V18H17.4664V6Z" fill="white" />
              </svg>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Sortlist</p>
                <p className="text-[#CCCCCC] text-xs">5.0 rating</p>
              </div>
            </a>

            {/* Clutch Badge */}
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#3A3A3A] rounded hover:bg-[#333333] active:bg-[#404040] transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_clutch)">
                  <rect width="24" height="24" rx="12" fill="black" />
                  <path
                    d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                    fill="#EF4335"
                  />
                  <path
                    d="M14.4616 14.5846C13.8402 15.083 12.9686 15.4562 12.097 15.4562C10.1057 15.4562 8.73783 13.9632 8.73783 11.9719C8.73783 9.98056 10.1057 8.61271 12.097 8.61271C12.9686 8.61271 13.8381 8.86083 14.4616 9.48432L14.8348 9.85756L16.8262 7.99134L16.3278 7.6181C15.2081 6.62349 13.7151 6 12.097 6C8.61271 6 6 8.61271 6 12.097C6 15.5813 8.61271 18.194 12.097 18.194C13.7151 18.194 15.2081 17.5727 16.3278 16.5759L16.8262 16.2027L14.8348 14.2114L14.4616 14.5846Z"
                    fill="white"
                  />
                  <path
                    d="M11.9718 14.0881C13.0703 14.0881 13.9631 13.1975 13.9631 12.0968C13.9631 10.9962 13.0725 10.1055 11.9718 10.1055C10.8712 10.1055 9.98047 10.9962 9.98047 12.0968C9.98047 13.1975 10.8712 14.0881 11.9718 14.0881Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_clutch">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Clutch</p>
                <p className="text-[#CCCCCC] text-xs">4.9 rating</p>
              </div>
            </a>

            {/* Google Badge */}
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#3A3A3A] rounded hover:bg-[#333333] active:bg-[#404040] transition-colors cursor-pointer"
            >
              <img src="/images/google-g-logo-201.png" alt="Google" width="24" height="24" className="w-6 h-6" />
              <div className="text-left">
                <p className="text-white text-sm font-medium">Google</p>
                <p className="text-[#CCCCCC] text-xs">4.9 rating</p>
              </div>
            </a>

            {/* G2 Badge */}
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#3A3A3A] rounded hover:bg-[#333333] active:bg-[#404040] transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="12" fill="#FF492C" />
                <path
                  d="M13.6512 5.14845L12.2761 7.99721C10.3893 8.08662 8.66179 9.2552 8.24854 11.0994C7.40281 14.8781 11.8517 17.405 14.8862 14.99L16.4391 17.653C12.4988 20.5243 6.64358 18.5728 5.29491 13.9995C3.78366 8.87578 8.3094 4.08871 13.6512 5.14845Z"
                  fill="white"
                />
                <path
                  d="M11.8957 13.9832L13.6504 10.9984H17.2432L18.9651 13.8261C19.0339 13.9661 18.9883 14.0633 18.937 14.1939C18.7336 14.7078 17.7421 16.2939 17.3889 16.7993C17.3521 16.8521 17.2095 17.0395 17.1639 17.0053L15.3675 13.9832H11.8957Z"
                  fill="white"
                />
                <path
                  d="M15.4068 9.10048H17.5611V10.0304H14.2095C14.2295 9.12613 14.4177 8.46293 15.1737 7.90546C15.5117 7.65666 16.4559 7.35033 16.524 6.96469C16.6401 6.31159 15.8072 6.31392 15.3771 6.55261C15.1809 6.66146 14.9711 7.11474 14.8157 7.08209L14.2903 6.42821C14.9567 4.89809 17.9479 5.27984 17.5427 7.18394C17.3161 8.24756 15.8304 8.21879 15.4068 9.0997V9.10048Z"
                  fill="white"
                />
              </svg>
              <div className="text-left">
                <div className="text-white text-sm font-medium">G2</div>
                <div className="text-[#CCCCCC] text-xs">5.0 rating</div>
              </div>
            </a>

            {/* DOU Badge */}
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#3A3A3A] rounded hover:bg-[#333333] active:bg-[#404040] transition-colors cursor-pointer"
            >
              <img src="/images/raiting-logos.png" alt="DOU" width="24" height="24" className="w-6 h-6" />
              <div className="text-left">
                <div className="text-white text-sm font-medium">DOU</div>
                <div className="text-[#CCCCCC] text-xs">5.0 rating</div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#CCCCCC] mt-8 pt-8 border-t border-[#3A3A3A] relative">
          <p>© Idea Team 2024. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span className="text-[#3A3A3A]">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#3A3A3A]">|</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
