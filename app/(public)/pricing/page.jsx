"use client";
import FAQSection from "@/components/common/FAQSection";
import Footer from "@/components/common/Footer";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
// import

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const getPrice = (monthlyPrice) => {
    if (billingCycle === "monthly") return `$${monthlyPrice}/mo`;
    const yearlyPrice = monthlyPrice * 12 * 0.8;
    return `$${yearlyPrice}/yr`;
  };

  return (
    <>
   
      <section className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-7xl font-bold mb-4">
            Simple, <span className="text-blue-600">Transparent</span> Pricing
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your workflow. From individual note-takers
            to high-performing teams, we have you covered.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`${billingCycle === "monthly" ? "font-semibold" : "text-gray-500"}`}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              className="w-14 h-7 bg-gray-300 rounded-full relative"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${billingCycle === "yearly" ? "translate-x-7" : ""
                  }`}
              />
            </button>

            <span
              className={`${billingCycle === "yearly" ? "font-semibold" : "text-gray-500"}`}
            >
              Yearly <span className="text-green-600 text-sm">SAVE 20%</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Personal */}
            <div className="bg-white border rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Personal</h3>
              <p className="text-gray-500 mb-6">
                Perfect for getting started with AI notes.
              </p>

              <p className="text-3xl font-bold mb-6">$0/mo</p>

              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Up to 100 smart notes
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Basic AI summarization
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Standard cloud sync
                </li>
                <li className="text-gray-400 flex justify-center items-center gap-2 "><CircleX /> No semantic search</li>
              </ul>

              <button className="w-full border py-2 rounded-lg">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-8 shadow-lg relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                MOST POPULAR
              </span>

              <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
              <p className="text-gray-500 mb-6">
                Unlock full intelligence and search capability.
              </p>

              <p className="text-3xl font-bold mb-6">{getPrice(12)}</p>

              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Unlimited smart notes
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Advanced AI summarization
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Semantic natural language search
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Smart linking between notes
                </li>
                <li className="flex justify-center items-center gap-2">
                  <CircleCheck /> Priority email support
                </li>
              </ul>

              <button className="w-full py-2 rounded-lg text-white bg-linear-to-r from-blue-500 to-purple-500">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white border rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">
                Powerhouse for teams and organizations.
              </p>

              <p className="text-3xl font-bold mb-6">Custom</p>

              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex justify-center items-center gap-2"> <CircleCheck /> Everything in Pro plan</li>
                <li className="flex justify-center items-center gap-2">  <CircleCheck />Team collaboration & sharing</li>
                <li className="flex justify-center items-center gap-2"> <CircleCheck /> Admin dashboard & SSO</li>
                <li className="flex justify-center items-center gap-2">  <CircleCheck />Dedicated success manager</li>
              </ul>

              <button className="w-full bg-gray-900 text-white py-2 rounded-lg">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <FAQSection />

      <section className="bg-white">
        <div className="shadow-xl max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 gap-6 rounded-lg text-center">
          <div>
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-black">
              Ready to elevate your knowledge
            </h1>
          </div>

          <p className="lg:text-lg text-gray-600 mb-6">
            Join over 50,000 thinkers who have revolutionized their workflow
            with AI Notes Managers
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-[15px] sm:text-lg md:text-xl lg:text-1xl text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Start Free Trial
            </button>

            <button className="border text-[15px] sm:text-lg md:text-xl lg:text-1xl border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              View All Features
            </button>
          </div>
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </>
  );
}
