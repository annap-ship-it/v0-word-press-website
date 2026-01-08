import { type NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LcKsjksAAAAAKwX5Qjqwh3KPfQL6wpAHZpv78WG"

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null
    const recaptchaToken = formData.get("recaptchaToken") as string

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Prepare file attachment if exists
    let attachmentInfo = "No file attached"
    let fileBase64 = ""
    let fileName = ""
    let fileMimeType = ""

    if (file && file.size > 0) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
      }

      // Allowed file types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "video/mp4",
      ]

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "File type not allowed. Allowed: jpg, png, pdf, docx, xlsx, mp4" },
          { status: 400 },
        )
      }

      const bytes = await file.arrayBuffer()
      fileBase64 = Buffer.from(bytes).toString("base64")
      fileName = file.name
      fileMimeType = file.type
      attachmentInfo = `File attached: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
    }

    // Send email using Resend or fallback to console log
    // For production, you would use Resend, SendGrid, or another email service
    const emailContent = {
      to: "oleksandr.r@ideateam.dev",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><strong>Attachment:</strong> ${attachmentInfo}</p>
      `,
      attachments:
        file && file.size > 0
          ? [
              {
                filename: fileName,
                content: fileBase64,
                type: fileMimeType,
              },
            ]
          : [],
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || resendApiKey.trim() === "") {
      console.warn("[v0] RESEND_API_KEY is not configured. Email will not be sent.")
      console.log("[v0] To enable emails, add RESEND_API_KEY to your environment variables")
      console.log("=== EMAIL WOULD BE SENT ===")
      console.log("To:", emailContent.to)
      console.log("Subject:", emailContent.subject)
      console.log("From:", name, `<${email}>`)
      console.log("Message:", message)
      console.log("Attachment:", attachmentInfo)
      console.log("===========================")

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (email service not configured)",
      })
    }

    const resendPayload: Record<string, unknown> = {
      from: "Contact Form <onboarding@resend.dev>",
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      reply_to: email, // Add reply-to for proper email threading
    }

    if (emailContent.attachments.length > 0) {
      resendPayload.attachments = emailContent.attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
      }))
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resendPayload),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("[v0] Resend API error:", responseData)
        return NextResponse.json(
          { error: `Failed to send email: ${responseData.message || "Unknown error"}` },
          { status: 500 },
        )
      }

      console.log("[v0] Email sent successfully via Resend:", responseData.id)
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        id: responseData.id,
      })
    } catch (fetchError) {
      console.error("[v0] Resend API fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
