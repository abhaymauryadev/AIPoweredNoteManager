import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import "./globals.css";

export const metadata = {
  title: "AI Notes Manager",
  description: "AI-powered notes app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning={true}>


        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>


      </body>
    </html>
  );
}
