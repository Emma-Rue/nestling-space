import { NextRequest, NextResponse } from 'next/server'
import { sendEnquiryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendEnquiryEmail({ name, email, phone, message, service })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry email error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
