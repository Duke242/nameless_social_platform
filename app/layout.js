import { getSEOTags } from "@/libs/seo"
import ClientLayout from "@/components/LayoutClient"
import config from "@/config"
import "./globals.css"
import Providers from "./providers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"

export const dynamic = "force-dynamic"

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
}

const font = Inter({ subsets: ["latin"] })

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags()

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <script
            defer
            data-domain={config.domainName}
            src="https://plausible.io/js/script.js"
          ></script>
        </head>
      )}
      <Providers>
        <body>
          <Analytics />
          <SpeedInsights />
          {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
          <ClientLayout>{children}</ClientLayout>
        </body>
      </Providers>
    </html>
  )
}
