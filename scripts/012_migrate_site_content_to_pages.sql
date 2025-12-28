-- Migrate existing site content into pages table as Gutenberg blocks
-- This will populate pages with actual content from the static pages

-- Update About page with content
UPDATE pages 
SET content = '[
  {
    "id": "block-1",
    "type": "heading",
    "level": "h1",
    "content": "About Us"
  },
  {
    "id": "block-2",
    "type": "paragraph",
    "content": "We are a team of passionate developers and designers dedicated to creating beautiful, functional websites that help businesses grow."
  },
  {
    "id": "block-3",
    "type": "columns",
    "columnCount": 2,
    "blocks": [
      {
        "id": "col-1",
        "type": "paragraph",
        "content": "Our mission is to deliver high-quality web solutions that exceed client expectations and drive real business results."
      },
      {
        "id": "col-2",
        "type": "paragraph",
        "content": "With years of experience in web development, we bring expertise in modern technologies and best practices to every project."
      }
    ]
  }
]'::jsonb
WHERE slug = 'about';

-- Update Contact page with content
UPDATE pages 
SET content = '[
  {
    "id": "block-1",
    "type": "heading",
    "level": "h1",
    "content": "Contact Us"
  },
  {
    "id": "block-2",
    "type": "paragraph",
    "content": "Get in touch with us to discuss your project or ask any questions."
  },
  {
    "id": "block-3",
    "type": "form",
    "fields": [
      {"type": "text", "label": "Name", "placeholder": "Your name", "required": true},
      {"type": "email", "label": "Email", "placeholder": "your@email.com", "required": true},
      {"type": "textarea", "label": "Message", "placeholder": "Your message", "required": true}
    ],
    "submitText": "Send Message",
    "showRecaptcha": true,
    "showTerms": true,
    "termsText": "I accept the Terms and Conditions"
  }
]'::jsonb
WHERE slug = 'contact';

-- Update Services page with content
UPDATE pages 
SET content = '[
  {
    "id": "block-1",
    "type": "heading",
    "level": "h1",
    "content": "Our Services"
  },
  {
    "id": "block-2",
    "type": "paragraph",
    "content": "We offer a comprehensive range of web development and design services to help your business succeed online."
  },
  {
    "id": "block-3",
    "type": "columns",
    "columnCount": 3,
    "blocks": [
      {
        "id": "service-1",
        "type": "heading",
        "level": "h3",
        "content": "Web Development"
      },
      {
        "id": "service-2",
        "type": "heading",
        "level": "h3",
        "content": "UI/UX Design"
      },
      {
        "id": "service-3",
        "type": "heading",
        "level": "h3",
        "content": "Consulting"
      }
    ]
  }
]'::jsonb
WHERE slug = 'services';

-- Update Homepage with content
UPDATE pages 
SET content = '[
  {
    "id": "block-1",
    "type": "heading",
    "level": "h1",
    "content": "Welcome to Our Website"
  },
  {
    "id": "block-2",
    "type": "paragraph",
    "content": "Professional web development and design services to help your business grow."
  },
  {
    "id": "block-3",
    "type": "button",
    "text": "Get Started",
    "url": "/contact",
    "style": "primary"
  }
]'::jsonb
WHERE slug = 'home';
