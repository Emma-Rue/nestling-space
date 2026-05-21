import { NextRequest, NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, preferredDate, preferredTime, notes } = body

    if (!name || !email || !service || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendBookingEmail({ name, email, phone, service, preferredDate, preferredTime, notes })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking email error:', error)
    return NextResponse.json({ error: 'Failed to send booking' }, { status: 500 })
  }
}
