"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your access will remain active until the end of your current billing cycle.",
  },
  {
    question: "Is my data secure with AI Notes Manager?",
    answer:
      "Security is our top priority. All notes are encrypted both in transit and at rest. We never use your private data to train our global AI models.",
  },
  {
    question: 'What is "Semantic Search"?',
    answer:
      "Unlike traditional keyword search, semantic search understands the meaning behind your query and finds relevant notes even if exact words are not present.",
  },
  {
    question: "Do you offer educational discounts?",
    answer:
      "Yes! We offer a 50% discount for students and educators. Contact our support team with your academic credentials.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 shadow-sm cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {faq.question}
                </h3>

                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}