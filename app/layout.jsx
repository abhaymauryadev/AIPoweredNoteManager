import "./globals.css";

export const metadata = {
  title: "AI Notes Manager",
  description: "AI-powered notes app built with Next.js",
  keywords: [
    // Short-tail
    "notes app", "AI notes", "Next.js app", "productivity", "notebooks",
    // Long-tail
    "AI-powered notebook manager for students",
    "best notes app for productivity and organization",
    "Next.js AI app to manage personal and work notebooks",
    "collaborative notebook tool with AI search",
    "digital notebook manager with smart features"
  ],

  authors: [{ name: "Your Name or Company", url: "https://yourdomain.com" }],
  openGraph: {
    title: "AI Notes Manager",
    description: "Organize and manage your notes with AI-powered efficiency.",
    url: "https://yourdomain.com",
    siteName: "AI Notes Manager",
    images: [
      {
        url: "https://yourdomain.com/preview.png",
        width: 1200,
        height: 630,
        alt: "AI Notes Manager preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Notes Manager",
    description: "AI-powered notes app built with Next.js",
    images: ["https://yourdomain.com/preview.png"],
    creator: "@yourtwitterhandle",
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* JSON-LD structured data for Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://yourdomain.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Notebooks",
                  item: "https://yourdomain.com/notebooks",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Folder",
                  item: "https://yourdomain.com/folders/sample-folder",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <main>{children}</main>
      </body>
    </html>
  );
}