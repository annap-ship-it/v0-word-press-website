import { NextResponse } from "next/server"

export async function GET() {
  // Return the reCAPTCHA site key from server environment
  // This key is designed to be public but the deployment system flags NEXT_PUBLIC_ variables
  return NextResponse.json({
    siteKey: process.env.RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  })
}
