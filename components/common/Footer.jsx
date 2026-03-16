import React from 'react';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="bg-white text-black  mt-30">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div className="text-center sm:text-left">
          <h2 className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl md:text-2xl font-bold text-black mb-4">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            AI Notes Manager
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            Elevating knowledge and productivity with intelligent note management.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Features</a></li>
            <li><a href="#" className="hover:text-black">Pricing</a></li>
            <li><a href="#" className="hover:text-black">Integrations</a></li>
            <li><a href="#" className="hover:text-black">API</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Follow Us</h3>
          <div className="flex  space-x-4 text-center justify-center text-sm">
            <a href="#" aria-label="Twitter" className="">X</a>
            <a href="#" aria-label="LinkedIn" className="">LinkedIn</a>
            <a href="#" aria-label="GitHub" className="">GitHub</a>
            <a href="#" aria-label="Discord" className="">Discord</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-6 text-center text-sm">
        © {new Date().getFullYear()} AI Notes Manager. All rights reserved.
      </div>
    </footer>
  );
}