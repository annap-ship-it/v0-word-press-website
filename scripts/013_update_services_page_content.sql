-- Update services page with structured content for admin editing
UPDATE pages 
SET content = '[
  {
    "id": "services-hero",
    "type": "heading",
    "level": 1,
    "content": "Services",
    "settings": {
      "anchor": "services-hero",
      "margin": {"top": 120, "bottom": 60},
      "color": "#FF6200"
    }
  },
  {
    "id": "service-1",
    "type": "columns",
    "columnCount": 2,
    "settings": {
      "margin": {"top": 0, "bottom": 80}
    },
    "columns": [
      {
        "blocks": [
          {
            "type": "heading",
            "level": 2,
            "content": "Custom web solutions"
          },
          {
            "type": "paragraph",
            "content": "We specialize in crafting bespoke websites and web applications tailored to your unique requirements and objectives. Whether you need a corporate website, an eCommerce platform, or a custom web-based software solution, our team of experienced developers works closely with you to understand your goals and objectives, ensuring that our designs align perfectly with your brand identity and objectives."
          }
        ]
      },
      {
        "blocks": [
          {
            "type": "image",
            "url": "/images/custom-web-solutions.jpg",
            "alt": "Custom web solutions - laptop with code",
            "settings": {"size": "cover", "alignment": "center"}
          }
        ]
      }
    ]
  }
]'::jsonb
WHERE slug = 'services';
