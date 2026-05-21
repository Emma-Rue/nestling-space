import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/lib/sanity'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const ticket = await client.fetch(
      `*[_type == "ticket" && token == $token][0]{
        _id, used, usedAt, buyerName, paid,
        "videoUrl": event->videoUrl,
        "eventTitle": event->title,
        "eventDate": event->date,
        "eventId": event._ref
      }`,
      { token } as Record<string, string>
    )

    if (!ticket) {
      return NextResponse.json({ status: 'invalid' }, { status: 404 })
    }

    if (!ticket.paid) {
      return NextResponse.json({ status: 'unpaid', message: 'Payment not confirmed for this ticket.' }, { status: 403 })
    }

    if (ticket.used) {
      return NextResponse.json({
        status: 'used',
        message: 'This link has already been used. Each watch link can only be accessed once.',
        usedAt: ticket.usedAt,
      })
    }

    // Mark ticket as used
    await writeClient
      .patch(ticket._id)
      .set({ used: true, usedAt: new Date().toISOString() })
      .commit()

    return NextResponse.json({
      status: 'valid',
      videoUrl: ticket.videoUrl,
      eventTitle: ticket.eventTitle,
      eventDate: ticket.eventDate,
      eventId: ticket.eventId,
      buyerName: ticket.buyerName,
    })
  } catch (error) {
    console.error('Ticket access error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
