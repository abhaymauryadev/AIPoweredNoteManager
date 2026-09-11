import "./globals.css";
import Script from "next/script";

const SITE_URL = "https://ai-powered-note-manager.vercel.app";
const SITE_NAME = "AI Notes Manager";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = "GTM-T35PBX4B";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a", // change to your brand color
};

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AI Notes Manager — Smart AI-Powered Notebook Organizer",
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Organize, search, and manage your notes with AI-powered efficiency. A smart notebook manager built for students, teams, and professionals.",

  keywords: [
    "notes app",
    "AI notes",
    "Next.js app",
    "productivity",
    "notebooks",
    "AI note manager",
    "AI-powered notebook manager for students",
    "best notes app for productivity and organization",
    "Next.js AI app to manage personal and work notebooks",
    "collaborative notebook tool with AI search",
    "digital notebook manager with smart features",
  ],

  category: "productivity",

  authors: [
    {
      name: "Abhay Maurya",
      url: "https://abhaymaurya.vercel.app",
    },
  ],

  creator: "Abhay Maurya",
  publisher: "Abhay Maurya",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "AI Notes Manager — Smart AI-Powered Notebook Organizer",
    description:
      "Organize and manage your notes with AI-powered efficiency.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/ai_driven_organisation.png`,
        width: 1536,
        height: 1024,
        alt: "AI Notes Manager — AI-driven note organization",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Notes Manager",
    description: "AI-powered notes app built with Next.js",
    images: [`${SITE_URL}/ai_driven_organisation.png`],
    creator: "@yourtwitterhandle",
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "h6MzCoJdtdwQYfqGkqnK5K0Uvoqz-QGLcuLppfHgLfk",
  },
};

// Structured data (JSON-LD) — tells Google exactly what this site is
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  description:
    "Organize and manage your notes with AI-powered efficiency.",
  author: {
    "@type": "Person",
    name: "Abhay Maurya",
    url: "https://abhaymaurya.vercel.app",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <main>{children}</main>
      </body>
    </html>
  );
}