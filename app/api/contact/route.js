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

        const html = buildEmailHtml({ name, email, company, service, message })

        await transporter.sendMail({
            from: `"Diversify Digital Global" <${process.env.SMTP_USER}>`,
            to: 'diversifydigitalglobal@gmail.com',
            replyTo: email,
            subject: `New Inquiry — ${name}${company ? ` (${company})` : ''}`,
            html,
            text: [
                `New contact form submission`,
                ``,
                `Name: ${name}`,
                `Email: ${email}`,
                company && `Company: ${company}`,
                service && `Service interested in: ${service}`,
                ``,
                `Message:`,
                message,
            ].filter(Boolean).join('\n'),
        })

        return Response.json({ ok: true })
    } catch (err) {
        console.error('Contact form error:', err)
        return Response.json({ error: 'Failed to send message.' }, { status: 500 })
    }
}

function buildEmailHtml({ name, email, company, service, message }) {
    const rows = [
        { label: 'Name', value: name },
        { label: 'Email', value: `<a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;">${email}</a>` },
    ]
    if (company) rows.push({ label: 'Company', value: company })
    if (service) rows.push({ label: 'Service', value: service })

    const detailRows = rows
        .map(
            (r) => `
            <tr>
                <td style="padding:10px 12px;font-size:13px;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6;">${r.label}</td>
                <td style="padding:10px 12px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${r.value}</td>
            </tr>`
        )
        .join('')

    const escapedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#1e1240 0%,#2a1263 50%,#7c3aed 100%);padding:28px 32px;">
                            <h1 style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">New Inquiry</h1>
                            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">Someone reached out via the website contact form</p>
                        </td>
                    </tr>
                    <!-- Details -->
                    <tr>
                        <td style="padding:24px 32px 8px;">
                            <p style="margin:0 0 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7c3aed;">Contact Details</p>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:8px;overflow:hidden;">
                                ${detailRows}
                            </table>
                        </td>
                    </tr>
                    <!-- Message -->
                    <tr>
                        <td style="padding:20px 32px 28px;">
                            <p style="margin:0 0 10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7c3aed;">Message</p>
                            <div style="background-color:#f9fafb;border:1px solid #f3f4f6;border-radius:8px;padding:16px 18px;">
                                <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${escapedMessage}</p>
                            </div>
                        </td>
                    </tr>
                    <!-- Reply CTA -->
                    <tr>
                        <td style="padding:0 32px 28px;" align="center">
                            <a href="mailto:${email}" style="display:inline-block;background-color:#7c3aed;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;padding:10px 28px;border-radius:8px;">Reply to ${name.split(' ')[0]}</a>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding:16px 32px;background-color:#f9fafb;border-top:1px solid #f3f4f6;">
                            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">Diversify Digital Global &middot; Contact Form Submission</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}
