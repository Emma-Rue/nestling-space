import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Appointment Bookings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Client Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'service', title: 'Requested Service', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'preferredDate', title: 'Preferred Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'preferredTime', title: 'Preferred Time', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'notes', title: 'Notes / Context', type: 'text', rows: 3 }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Approval', value: 'pending' },
          { title: 'Confirmed / Scheduled', value: 'confirmed' },
          { title: 'Declined / Conflict', value: 'declined' },
          { title: 'Cancelled by Client', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'preferredDate', status: 'status' },
    prepare(selection) {
      const { title, subtitle, status } = selection
      return {
        title: title || 'Anonymous Booking Request',
        subtitle: `${subtitle || 'No Date Selected'} (${status})`,
      }
    }
  },
})
