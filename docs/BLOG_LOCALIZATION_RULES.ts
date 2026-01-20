// ⚠️ CRITICAL NOTES FOR BLOG LOCALIZATION
// DO NOT REMOVE OR MODIFY THIS FILE WITHOUT UNDERSTANDING FULL IMPLICATIONS

/**
 * BLOG LOCALIZATION ARCHITECTURE
 * ==============================
 * 
 * RULE 1: English = Primary Language
 * - Every post MUST have an English version
 * - English is the default/fallback for all posts
 * - English posts can exist independently
 * 
 * RULE 2: Ukrainian = Full Localization
 * - Every Ukrainian post MUST have:
 *   - Same slug as English version
 *   - locale = 'uk' column value
 *   - meta_title (for SEO)
 *   - meta_description (for SEO)
 *   - Full localized content (title, excerpt, content)
 * 
 * RULE 3: Fallback Logic (CRITICAL)
 * - Try to fetch post in requested locale
 * - If not found AND locale !== 'en', fall back to English
 * - This ensures NO 404 errors for existing posts
 * 
 * RULE 4: "Back to Blog" Positioning
 * - MUST have pt-24 md:pt-28 lg:pt-32 margin-top
 * - This ensures it's ALWAYS below header on all screen sizes
 * - DO NOT change without testing on mobile/tablet/desktop
 * 
 * RULE 5: Scroll-to-Top
 * - MUST scroll to top when page loads
 * - Comment: window.scrollTo(0, 0) on [slug] param change
 * - DO NOT REMOVE - required by design specifications
 * 
 * RULE 6: Scroll Animations
 * - AnimatedSection component provides fade-in on scroll
 * - DO NOT REMOVE animations - required by design
 * - Components include scroll animation with proper delays
 * 
 * DATABASE MIGRATIONS APPLIED
 * ===========================
 * 020_fix_post_slugs.sql - Removed locale suffixes from slugs
 * 021_cleanup_post_slugs.sql - Cleaned up duplicates
 * 023_fix_localization_integrity.sql - Created English stubs for UK-only posts
 * 
 * All meta_title and meta_description fields populated
 * All (slug, locale) pairs are now unique
 * All Ukrainian posts have English counterparts
 */

export const BLOG_LOCALIZATION_RULES = {
  PRIMARY_LANGUAGE: "en",
  FALLBACK_LOGIC: "english",
  BACK_TO_BLOG_MARGIN_TOP_CLASSES: "pt-24 md:pt-28 lg:pt-32",
  SCROLL_TO_TOP_ENABLED: true,
  SCROLL_ANIMATIONS_ENABLED: true,
  META_TAGS_STRATEGY: "database_fields",
} as const
