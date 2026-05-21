import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string',
      description: 'Never shown publicly.',
    }),
    defineField({ name: 'body', title: 'Comment', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'approved', title: 'Approved', type: 'boolean', initialValue: false }),
    defineField({ name: 'createdAt', title: 'Created At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'body' },
  },
})
