import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ticket',
  title: 'Ticket',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'buyerName', title: 'Buyer Name', type: 'string' }),
    defineField({ name: 'buyerEmail', title: 'Buyer Email', type: 'string' }),
    defineField({ name: 'buyerPhone', title: 'Buyer Phone', type: 'string' }),
    defineField({ name: 'paymentReference', title: 'Payment Reference', type: 'string' }),
    defineField({
      name: 'token',
      title: 'Watch Token (UUID)',
      type: 'string',
      description: 'Unique one-time token for accessing the watch page.',
    }),
    defineField({ name: 'paid', title: 'Payment Confirmed', type: 'boolean', initialValue: false }),
    defineField({ name: 'used', title: 'Watch Link Used', type: 'boolean', initialValue: false }),
    defineField({ name: 'usedAt', title: 'Used At', type: 'datetime' }),
    defineField({ name: 'createdAt', title: 'Created At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'buyerName', subtitle: 'buyerEmail' },
  },
})
