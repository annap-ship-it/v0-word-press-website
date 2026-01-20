"use server"

export async function getRecaptchaSiteKey(): Promise<string> {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
}
