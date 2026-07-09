import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Homepage Content Settings',
      readOnly: true,
    }),
    
    // ======== HERO ========
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Mental Wellness' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string', initialValue: 'A Safe Place' }),
        defineField({ name: 'titleLine2', title: 'Title Line 2', type: 'string', initialValue: 'To Heal.' }),
        defineField({
          name: 'subtext',
          title: 'Subtext Description',
          type: 'text',
          rows: 3,
          initialValue: "Welcome to The Nestling Space, a gentle home for your healing and growth. Here, you are seen, heard, and supported as you untangle life's worries, build emotional strength, and move toward clarity, peace, and purpose.",
        }),
        defineField({ name: 'primaryBtnText', title: 'Primary Button Text', type: 'string', initialValue: 'Book a Session' }),
        defineField({ name: 'primaryBtnLink', title: 'Primary Button Link', type: 'string', initialValue: '/book' }),
        defineField({ name: 'secondaryBtnText', title: 'Secondary Button Text', type: 'string', initialValue: 'Our Services' }),
        defineField({ name: 'secondaryBtnLink', title: 'Secondary Button Link', type: 'string', initialValue: '/services' }),
        defineField({
          name: 'trustItems',
          title: 'Trust & Credential Points',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Evidence-Based Care', 'Culturally Sensitive', 'Online & In-Person', 'Confidential'],
        }),
        defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
        defineField({ name: 'videoUrl', title: 'Video URL (e.g. YouTube/Vimeo/Public link)', type: 'string' }),
        defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // ======== TICKER ========
    defineField({
      name: 'ticker',
      title: 'Ticker Section',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Ticker Items (Scrolling text)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Evidence-Based Care',
            'Culturally Sensitive',
            'Online & In-Person',
            'Confidential',
            'Safe & Supportive',
            'Professional & Qualified',
          ],
        }),
      ],
    }),

    // ======== ABOUT PREVIEW ========
    defineField({
      name: 'aboutPreview',
      title: 'About Preview Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Who We Are' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Who we are' }),
        defineField({
          name: 'paragraph1',
          title: 'Paragraph 1',
          type: 'text',
          rows: 4,
          initialValue: 'The Nestling Space was founded from a rare blend of clinical science, public health, teaching, and hands-on counselling experience. Over a decade of working with students, families, and communities shaped a clear calling: provide culturally sensitive mental health support that helps break cycles of pain and restore resilience.',
        }),
        defineField({
          name: 'paragraph2',
          title: 'Paragraph 2',
          type: 'text',
          rows: 4,
          initialValue: 'The practice was formalised after the COVID-19 pandemic made the psychological cost of isolation, fear, and grief impossible to ignore. We bring therapeutic care, prevention, education, and community understanding together under one roof.',
        }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Meet Dr. Mugabe →' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string', initialValue: '/about' }),
        defineField({ name: 'image', title: 'Founder Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
        defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
      ],
    }),

    // ======== VIDEO FEATURE ========
    defineField({
      name: 'videoFeature',
      title: 'Video Feature Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'In Their Words' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Watch the practice in motion' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Short clips from Dr. Mugabe and the Nestling Space environment.',
        }),
        defineField({
          name: 'videos',
          title: 'Featured Videos',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'videoItem',
              title: 'Video Item',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'posterImage', title: 'Poster Image (Placeholder)', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
                defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // ======== SERVICES PREVIEW ========
    defineField({
      name: 'servicesPreview',
      title: 'Services Preview Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'What We Offer' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'What we offer' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Comprehensive counselling for individuals, couples, families, and organisations navigating real emotional and relational pressures.',
        }),
        defineField({
          name: 'services',
          title: 'Featured Services Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'serviceCard',
              title: 'Service Card',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
                defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // ======== PRACTICE GALLERY ========
    defineField({
      name: 'gallery',
      title: 'Practice Gallery Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Our Practice' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Healing in action' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Real sessions, real spaces, real people — a glimpse into the warmth and care at The Nestling Space.',
        }),
        defineField({
          name: 'images',
          title: 'Gallery Images',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'galleryItem',
              title: 'Gallery Item',
              fields: [
                defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
                defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // ======== QUOTE TILE ========
    defineField({
      name: 'quote',
      title: 'Quote Section',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 2, initialValue: '“Your mind. Your health. Your worth.”' }),
        defineField({ name: 'author', title: 'Author / Subtext', type: 'string', initialValue: 'You are not alone. You are welcome here.' }),
        defineField({ name: 'btnText', title: 'Button Text', type: 'string', initialValue: 'Take the first step' }),
        defineField({ name: 'btnLink', title: 'Button Link', type: 'string', initialValue: '/book' }),
        defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
        defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
      ],
    }),

    // ======== EVENTS PREVIEW ========
    defineField({
      name: 'eventsPreview',
      title: 'Events Section Headers',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Events & Webinars' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Upcoming Events & Webinars' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Workshops, training sessions, and group events open to the public.',
        }),
        defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
        defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
      ],
    }),

    // ======== TESTIMONIALS ========
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Stories of Healing' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'What our clients say' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Discover how The Nestling Space with Dr. M. Mugabe has positively impacted the lives of our clients.',
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials List',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'testimonialItem',
              title: 'Testimonial Item',
              fields: [
                defineField({ name: 'quote', title: 'Quote Text', type: 'text', rows: 3 }),
                defineField({ name: 'author', title: 'Author Name', type: 'string' }),
                defineField({ name: 'label', title: 'Author Subtitle/Label', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // ======== BLOG PREVIEW ========
    defineField({
      name: 'blogPreview',
      title: 'Blog / Feedback Section Headers',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: 'Feedback' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Share your feedback' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Use the contact page to send us your thoughts, comments, or suggestions.',
        }),
        defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
        defineField({ name: 'videoUrl', title: 'Video URL', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
