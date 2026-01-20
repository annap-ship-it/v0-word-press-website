-- Check what posts exist for each slug and locale
SELECT slug, locale, title, status FROM posts ORDER BY slug, locale;
