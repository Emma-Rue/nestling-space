import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/lib/sanity'
import { sendTicketEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const status = formData.get('status') as string
    const reference = formData.get('reference') as string

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
    }

    if (status?.toLowerCase() === 'paid') {
      // Find ticket by reference
      const ticket = await client.fetch(
        `*[_type == "ticket" && paymentReference == $ref][0]{
          _id, token, buyerName, buyerEmail,
          "eventId": event._ref,
          "eventTitle": event->title,
          "eventDate": event->date
        }`,
        { ref: reference } as Record<string, string>
      )

      if (!ticket) {
        console.error('Ticket not found for reference:', reference)
        return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
      }

      if (ticket.paid) {
        // Already processed
        return NextResponse.json({ success: true, message: 'Already processed' })
      }

      // Mark ticket as paid
      await writeClient
        .patch(ticket._id)
        .set({ paid: true })
        .commit()

      // Send ticket email with watch link
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
      const watchUrl = `${baseUrl}/events/${ticket.eventId}/watch/${ticket.token}`

      const eventDate = ticket.eventDate
        ? new Date(ticket.eventDate).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'TBD'

      await sendTicketEmail({
        buyerName: ticket.buyerName,
        buyerEmail: ticket.buyerEmail,
        eventTitle: ticket.eventTitle,
        watchUrl,
        eventDate,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
