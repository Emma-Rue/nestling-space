import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
    }

    const ticket = await client.fetch(
      `*[_type == "ticket" && paymentReference == $ref][0]{
        paid, token, "eventId": event._ref
      }`,
      { ref: reference } as Record<string, string>
    )

    if (!ticket) {
      return NextResponse.json({ status: 'pending', token: null })
    }

    if (ticket.paid) {
      return NextResponse.json({
        status: 'paid',
        token: ticket.token,
        eventId: ticket.eventId,
      })
    }

    return NextResponse.json({ status: 'pending', token: null })
  } catch (error) {
    console.error('Payment check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
