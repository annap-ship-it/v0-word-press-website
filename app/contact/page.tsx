"use client"

import { useLocale } from "@/lib/locale-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      info: "Contact Information",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Address",
      emailValue: "hello@example.com",
      phoneValue: "+1 (555) 123-4567",
      addressValue: "123 Business St, Suite 100, City, Country",
    },
    uk: {
      title: "Зв'яжіться з нами",
      subtitle: "Зв'яжіться з нашою командою",
      name: "Ім'я",
      email: "Електронна пошта",
      message: "Повідомлення",
      send: "Відправити",
      info: "Контактна Інформація",
      emailLabel: "Електронна пошта",
      phoneLabel: "Телефон",
      addressLabel: "Адреса",
      emailValue: "hello@example.com",
      phoneValue: "+1 (555) 123-4567",
      addressValue: "вул. Бізнесова 123, Офіс 100, Місто, Країна",
    },
  }

  const t = content[locale]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-xl text-foreground/80 text-balance">{t.subtitle}</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.name}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background"
                    placeholder={t.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.email}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background"
                    placeholder={t.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.message}</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background resize-none"
                    placeholder={t.message}
                  />
                </div>
                <Button size="lg" className="w-full">
                  {t.send}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">{t.info}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{t.emailLabel}</div>
                      <div className="text-foreground/70">{t.emailValue}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{t.phoneLabel}</div>
                      <div className="text-foreground/70">{t.phoneValue}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{t.addressLabel}</div>
                      <div className="text-foreground/70">{t.addressValue}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
