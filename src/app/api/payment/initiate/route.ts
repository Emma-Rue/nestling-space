import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/lib/sanity'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Paynow = require('paynow')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, buyerName, buyerEmail, buyerPhone } = body

    if (!eventId || !buyerName || !buyerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch event from Sanity
    const event = await client.fetch(
      `*[_type == "event" && _id == $id][0]{ _id, title, price, maxTickets, status }`,
      { id: eventId } as Record<string, string>
    )

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (event.status === 'past') {
      return NextResponse.json({ error: 'This event has already passed' }, { status: 400 })
    }

    // Check ticket availability
    if (event.maxTickets) {
      const soldCount = await client.fetch(
        `count(*[_type == "ticket" && event._ref == $id && paid == true])`,
        { id: eventId } as Record<string, string>
      )
      if (soldCount >= event.maxTickets) {
        return NextResponse.json({ error: 'Event is sold out' }, { status: 400 })
      }
    }

    const reference = `NS-${uuidv4().split('-')[0].toUpperCase()}-${Date.now()}`
    const token = uuidv4()

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const returnUrl = `${baseUrl}/events/payment-success?reference=${reference}`
    const resultUrl = `${baseUrl}/api/payment/callback`

    const paynow = new Paynow(
      process.env.PAYNOW_INTEGRATION_ID,
      process.env.PAYNOW_INTEGRATION_KEY
    )
    paynow.resultUrl = resultUrl
    paynow.returnUrl = returnUrl

    const payment = paynow.createPayment(reference, buyerEmail)
    payment.add(event.title, event.price)

    const response = await paynow.send(payment)

    if (!response.success) {
      console.error('PayNow initiation failed:', response)
      return NextResponse.json({ error: 'Payment initiation failed' }, { status: 502 })
    }

    // Save pending ticket to Sanity
    await writeClient.create({
      _type: 'ticket',
      event: { _type: 'reference', _ref: eventId },
      buyerName,
      buyerEmail,
      buyerPhone: buyerPhone ?? '',
      paymentReference: reference,
      token,
      paid: false,
      used: false,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      redirectUrl: response.redirectUrl,
      pollUrl: response.pollUrl,
      reference,
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
