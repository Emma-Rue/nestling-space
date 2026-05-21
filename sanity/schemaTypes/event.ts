import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event / Webinar',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'date', title: 'Date & Time', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'price', title: 'Price (USD)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', initialValue: 'USD' }),
    defineField({ name: 'maxTickets', title: 'Max Tickets', type: 'number' }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Private)',
      type: 'string',
      description: 'This URL is never exposed publicly — only accessible via secure one-time ticket token.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Live', value: 'live' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    }),
    defineField({ name: 'isVirtual', title: 'Is Virtual?', type: 'boolean', initialValue: true }),
    defineField({ name: 'platform', title: 'Platform (e.g. Zoom, Google Meet)', type: 'string' }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Webinar', value: 'webinar' },
          { title: 'Bride Shower', value: 'brideShower' },
          { title: 'Children at Risk', value: 'childrenAtRisk' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Community Event', value: 'community' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'mainImage' },
  },
})
