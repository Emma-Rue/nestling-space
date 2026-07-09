import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Services Page Content Settings',
      readOnly: true,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Page Eyebrow',
      type: 'string',
      initialValue: 'Our Services',
    }),
    defineField({
      name: 'titleText',
      title: 'Page Title',
      type: 'string',
      initialValue: 'What we offer',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue: 'Comprehensive counselling and training services designed for people, families, schools, churches, and workplaces.',
    }),
    defineField({
      name: 'servicesList',
      title: 'Detailed Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceDetail',
          title: 'Service Detail',
          fields: [
            defineField({ name: 'title', title: 'Service Title', type: 'string' }),
            defineField({ name: 'description', title: 'Service Description', type: 'text', rows: 4 }),
            defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
            defineField({ name: 'videoUrl', title: 'Video URL (e.g. YouTube/Vimeo)', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
