import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    // Query booked time slots for this date in Sanity (exclude declined/cancelled status)
    const query = `*[_type == "booking" && preferredDate == $date && status in ["pending", "confirmed"]] { preferredTime }`
    const bookings = await client.fetch<Array<{ preferredTime: string }>>(query, { date }, { useCdn: false })
    const bookedTimes = bookings.map((b) => b.preferredTime)

    // Query events (workshops/webinars) on this day (Zimbabwe is UTC+2)
    // Query startOfDay and endOfDay to cover timezone offsets safely
    const eventQuery = `*[_type == "event" && date >= $startOfDay && date <= $endOfDay && status in ["upcoming", "live"]] { date }`
    const startOfDay = `${date}T00:00:00Z`
    const endOfDay = `${date}T23:59:59Z`
    const events = await client.fetch(eventQuery, { startOfDay, endOfDay }, { useCdn: false })

    for (const event of events) {
      const eventDate = new Date(event.date)
      // Zimbabwe is UTC+2
      const zimbabweHour = (eventDate.getUTCHours() + 2) % 24

      if (zimbabweHour < 12) {
        bookedTimes.push('Morning (8am–12pm)')
      } else if (zimbabweHour >= 12 && zimbabweHour < 16) {
        bookedTimes.push('Afternoon (12pm–4pm)')
      } else {
        bookedTimes.push('Evening (4pm–7pm)')
      }
    }

    return NextResponse.json({ bookedTimes: Array.from(new Set(bookedTimes)) })
  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
