import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'previousEvent',
  title: 'Previous Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bride Shower', value: 'brideShower' },
          { title: 'Children at Risk', value: 'childrenAtRisk' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Community Event', value: 'community' },
          { title: 'Counselling Event', value: 'counsellingEvent' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'images.0' },
  },
})
