import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, company, service, message } = await request.json()

        if (!name || !email || !message) {
            return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 })
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        await transporter.sendMail({
            from: `"Diversify Digital Contact" <${process.env.SMTP_USER}>`,
            to: 'syedjawadshah00@gmail.com',
            replyTo: email,
            subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                company && `Company: ${company}`,
                service && `Service: ${service}`,
                `\nMessage:\n${message}`,
            ].filter(Boolean).join('\n'),
        })

        return Response.json({ ok: true })
    } catch (err) {
        console.error('Contact form error:', err)
        return Response.json({ error: 'Failed to send message.' }, { status: 500 })
    }
}
