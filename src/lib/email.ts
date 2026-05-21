import nodemailer from 'nodemailer'

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER ?? '',
      pass: process.env.EMAIL_APP_PASSWORD ?? '',
    },
  })
}

// Lazy transporter to avoid build-time failures when env vars are not set
export const transporter = { sendMail: (opts: Parameters<ReturnType<typeof nodemailer.createTransport>['sendMail']>[0]) => getTransporter().sendMail(opts) }

export async function sendEnquiryEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'nestlingsafespace@gmail.com',
    subject: `New Enquiry from ${data.name} — Nestling Space`,
    html: `
      <h2 style="color:#6C8066;">New Enquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="background:#FCF1EE;padding:16px;border-radius:8px;">${data.message}</p>
    `,
  })

  await transporter.sendMail({
    from: `"The Nestling Space" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'We received your enquiry — The Nestling Space',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#6C8066;">Thank you, ${data.name}</h2>
        <p>We have received your enquiry and Dr. Mugabe will be in touch with warmth and care.</p>
        <p>In the meantime, you can reach us on WhatsApp: <a href="https://wa.me/263773214886" style="color:#6C8066;">+263 77 321 4886</a></p>
        <br/>
        <p>Warm regards,<br/><strong>The Nestling Space Team</strong></p>
      </div>
    `,
  })
}

export async function sendBookingEmail(data: {
  name: string
  email: string
  phone?: string
  service: string
  preferredDate: string
  preferredTime: string
  notes?: string
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'nestlingsafespace@gmail.com',
    subject: `New Booking Request from ${data.name} — Nestling Space`,
    html: `
      <h2 style="color:#6C8066;">New Booking Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Service:</strong> ${data.service}</p>
      <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
      <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
    `,
  })

  await transporter.sendMail({
    from: `"The Nestling Space" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'Booking Request Received — The Nestling Space',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#6C8066;">Thank you, ${data.name}</h2>
        <p>Your booking request for <strong>${data.service}</strong> has been received.</p>
        <p>Dr. Mugabe will confirm your appointment shortly.</p>
        <br/>
        <p>Warm regards,<br/><strong>The Nestling Space Team</strong></p>
      </div>
    `,
  })
}

export async function sendTicketEmail(data: {
  buyerName: string
  buyerEmail: string
  eventTitle: string
  watchUrl: string
  eventDate: string
}) {
  await transporter.sendMail({
    from: `"The Nestling Space" <${process.env.EMAIL_USER}>`,
    to: data.buyerEmail,
    subject: `Your ticket for "${data.eventTitle}" — The Nestling Space`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#6C8066;">Your ticket is confirmed!</h2>
        <p>Dear ${data.buyerName},</p>
        <p>Your payment has been received. You are registered for <strong>${data.eventTitle}</strong> on ${data.eventDate}.</p>
        <h3 style="color:#3A3028;">Your Personal Watch Link:</h3>
        <p>
          <a href="${data.watchUrl}" style="background:#587A54;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
            Join the Webinar
          </a>
        </p>
        <p style="color:#cc3333;margin-top:16px;"><strong>Important: This link is personal and can only be used once. Do not share it.</strong></p>
        <br/>
        <p>Warm regards,<br/><strong>The Nestling Space Team</strong></p>
      </div>
    `,
  })
}
