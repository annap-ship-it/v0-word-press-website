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

    // Prepare file attachments if exist (handle multiple files)
    const files = formData.getAll("files") as File[]
    const attachments: Array<{ filename: string; content: string }> = []
    let attachmentInfo = "No files attached"

    // Allowed file types
    const allowedMimeTypes = [
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/pdf", // .pdf
      "application/vnd.ms-powerpoint", // .ppt
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    ]

    const attachmentsList: string[] = []

    if (files && files.length > 0) {
      for (const file of files) {
        if (file && file.size > 0) {
          // Check file size (max 3MB per file)
          if (file.size > 3 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds 3MB limit` },
              { status: 400 },
            )
          }

          if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json(
              { error: `File type for "${file.name}" not allowed. Allowed: doc, docx, pdf, ppt, pptx` },
              { status: 400 },
            )
          }

          const bytes = await file.arrayBuffer()
          const fileBase64 = Buffer.from(bytes).toString("base64")
          attachments.push({
            filename: file.name,
            content: fileBase64,
          })
          attachmentsList.push(`${file.name} (${(file.size / 1024).toFixed(2)} KB)`)
        }
      }

      if (attachmentsList.length > 0) {
        attachmentInfo = `Files attached: ${attachmentsList.join(", ")}`
      }
    }

    // Send email using Resend
    const emailContent = {
      to: "oleksandr.r@ideateam.dev",
      subject: `New Consultation Request from ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="padding: 10px; background-color: #f5f5f5; border-left: 3px solid #FF6200;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        <hr>
        <p><strong>Attachments:</strong> ${attachmentInfo}</p>
      `,
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || resendApiKey.trim() === "") {
      console.error("[v0] RESEND_API_KEY is not configured.")
      console.error("[v0] Available env keys:", Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('API')).join(', '))
      return NextResponse.json(
        { error: "Email service (Resend) is not configured. Please ensure RESEND_API_KEY is set in your environment variables." },
        { status: 500 },
      )
    }

    const resendPayload: Record<string, unknown> = {
      from: "Contact Form <onboarding@resend.dev>",
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      reply_to: email,
    }

    if (attachments.length > 0) {
      resendPayload.attachments = attachments.map((att) => ({
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
        console.error("[v0] Resend API error:", {
          status: response.status,
          error: responseData,
        })
        return NextResponse.json(
          { error: `Email service error: ${responseData.message || responseData.error || "Unknown error"}` },
          { status: 500 },
        )
      }

      console.log("[v0] Consultation request email sent successfully. ID:", responseData.id)
      return NextResponse.json({
        success: true,
        message: "Your consultation request has been sent successfully!",
        id: responseData.id,
      })
    } catch (fetchError) {
      console.error("[v0] Resend API fetch error:", fetchError)
      const errorMsg = fetchError instanceof Error ? fetchError.message : "Unknown error"
      return NextResponse.json(
        { error: `Failed to send email: ${errorMsg}` },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
