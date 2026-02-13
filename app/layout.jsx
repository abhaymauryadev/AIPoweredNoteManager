import "./globals.css";

export const metadata = {
  title: "AI Notes Manager",
  description: "AI-powered notes app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
