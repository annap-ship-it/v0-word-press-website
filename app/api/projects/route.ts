import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    // Get projects category ID
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", "projects")
      .single()

    if (categoryError || !category) {
      throw new Error("Projects category not found")
    }

    // Get published projects
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, featured_image, content, created_at")
      .eq("category_id", category.id)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (postsError) {
      throw new Error(postsError.message)
    }

    // If no projects found, use default projects
    const defaultProjects = [
      {
        id: "1",
        title: "Internal Monitoring System for Symbotic",
        slug: "internal-monitoring-system-symbotic",
        image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
        shortDescription: {
          en: "Implemented solution to enhance user engagement and increase visibility for marketing efforts.",
          uk: "Реалізованого рішення для підвищення залученості користувачів та видимості при маркетингових зусиллях.",
        },
      },
      {
        id: "2",
        title: "Intertop Sensor Infobox",
        slug: "intertop-sensor-infobox",
        image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
        shortDescription: {
          en: "Improved customer experience with accurate, up-to-date product information in-store.",
          uk: "Поліпшена взаємодія з клієнтами завдяки точній та актуальній інформації про товари в магазині.",
        },
      },
      {
        id: "3",
        title: "Multi-brand E-commerce Landing Pages",
        slug: "multi-brand-ecommerce-landing-pages",
        image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
        shortDescription: {
          en: "Enhanced user engagement and increased visibility for marketing efforts.",
          uk: "Посилена залученість користувачів та збільшена видимість при маркетингових зусиллях.",
        },
      },
      {
        id: "4",
        title: "Testing Expertise for a Sports Social Platform",
        slug: "testing-expertise-sports-social-platform",
        image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
        shortDescription: {
          en: "Improved release stability, higher product quality, and smoother QA processes.",
          uk: "Підвищена стабільність релізів, вища якість продукту та плавніші процеси QA.",
        },
      },
    ]

    // Map posts to the format needed for Our Projects section
    const projects =
      posts && posts.length > 0
        ? posts.map((post) => ({
            id: post.id,
            title: {
              en: post.title,
              uk: post.title, // TODO: Add Ukrainian titles from translations
            },
            slug: post.slug,
            image: post.featured_image || "/placeholder.svg",
            shortDescription: {
              en: post.excerpt || "Explore our recent client work",
              uk: post.excerpt || "Вивчайте нашу недавню роботу з клієнтами",
            },
          }))
        : defaultProjects

    return NextResponse.json(projects)
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    // Return default projects on error
    const defaultProjects = [
      {
        id: "1",
        title: {
          en: "Internal Monitoring System for Symbotic",
          uk: "Система внутрішнього моніторингу для Symbotic",
        },
        slug: "internal-monitoring-system-symbotic",
        image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
        shortDescription: {
          en: "Implemented solution to enhance user engagement and increase visibility for marketing efforts.",
          uk: "Реалізованого рішення для підвищення залученості користувачів та видимості при маркетингових зусиллях.",
        },
      },
      {
        id: "2",
        title: {
          en: "Intertop Sensor Infobox",
          uk: "Intertop Sensor Infobox",
        },
        slug: "intertop-sensor-infobox",
        image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
        shortDescription: {
          en: "Improved customer experience with accurate, up-to-date product information in-store.",
          uk: "Поліпшена взаємодія з клієнтами завдяки точній та актуальній інформації про товари в магазині.",
        },
      },
      {
        id: "3",
        title: {
          en: "Multi-brand E-commerce Landing Pages",
          uk: "Багатобрендові сторінки e-commerce",
        },
        slug: "multi-brand-ecommerce-landing-pages",
        image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
        shortDescription: {
          en: "Enhanced user engagement and increased visibility for marketing efforts.",
          uk: "Посилена залученість користувачів та збільшена видимість при маркетингових зусиллях.",
        },
      },
      {
        id: "4",
        title: {
          en: "Testing Expertise for a Sports Social Platform",
          uk: "Тестування експертизи для спортивної соціальної платформи",
        },
        slug: "testing-expertise-sports-social-platform",
        image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
        shortDescription: {
          en: "Improved release stability, higher product quality, and smoother QA processes.",
          uk: "Підвищена стабільність релізів, вища якість продукту та плавніші процеси QA.",
        },
      },
    ]
    return NextResponse.json(defaultProjects)
  }
}
