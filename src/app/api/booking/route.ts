import { NextRequest, NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/email'
import { writeClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, preferredDate, preferredTime, notes } = body

    if (!name || !email || !service || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const todayStr = new Date().toISOString().split('T')[0]
    if (preferredDate <= todayStr) {
      return NextResponse.json(
        { error: 'Appointments must be booked at least one day in advance.' },
        { status: 400 }
      )
    }

    // 1. Check for double bookings (collisions) in Sanity
    const collisionQuery = `*[_type == "booking" && preferredDate == $preferredDate && preferredTime == $preferredTime && status in ["pending", "confirmed"]][0]`
    const collision = await writeClient.fetch(collisionQuery, { preferredDate, preferredTime })

    if (collision) {
      return NextResponse.json(
        { error: 'This time slot has already been requested or scheduled. Please select another time.' },
        { status: 409 }
      )
    }

    // 2. Check for event conflicts
    const eventQuery = `*[_type == "event" && date >= $startOfDay && date <= $endOfDay && status in ["upcoming", "live"]] { date }`
    const startOfDay = `${preferredDate}T00:00:00Z`
    const endOfDay = `${preferredDate}T23:59:59Z`
    const events = await writeClient.fetch(eventQuery, { startOfDay, endOfDay })

    for (const event of events) {
      const eventDate = new Date(event.date)
      const zimbabweHour = (eventDate.getUTCHours() + 2) % 24
      let eventSlot = ''

      if (zimbabweHour < 12) {
        eventSlot = 'Morning (8am–12pm)'
      } else if (zimbabweHour >= 12 && zimbabweHour < 16) {
        eventSlot = 'Afternoon (12pm–4pm)'
      } else {
        eventSlot = 'Evening (4pm–7pm)'
      }

      if (eventSlot === preferredTime) {
        return NextResponse.json(
          { error: 'This slot conflicts with a scheduled public workshop or webinar. Please select another time.' },
          { status: 409 }
        )
      }
    }

    // 3. Save pending booking to Sanity
    await writeClient.create({
      _type: 'booking',
      name,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      notes,
      status: 'pending',
    })

    // 4. Send email notification
    try {
      await sendBookingEmail({ name, email, phone, service, preferredDate, preferredTime, notes })
    } catch (emailErr) {
      console.warn('Booking email notification failed, but booking was successfully saved in database:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json({ error: 'Failed to request booking' }, { status: 500 })
  }
}
