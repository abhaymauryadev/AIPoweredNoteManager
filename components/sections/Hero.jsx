import React from "react";
import { BrainCircuit, Link, Search } from "lucide-react";
export default function Hero() {
  return (
    <>
      <section className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Desktop video */}
          <source
            src="/animated_background.mp4"
            type="video/mp4"
            media="(min-width:768px)"
          />
          {/* Mobile video */}
          <source
            src="/animated_background.mp4"
            type="video/mp4"
            media="(max-width:767px)"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Capture Ideas, Unlock Intelligence. <br />
            The Future of Note-taking.
          </h1>

          <p className="text-gray-200 max-w-3xl mx-auto text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px]">
            AI Notes uses advanced AI to organize, summarize, and connect your
            thoughts. <br />
            Turn scattered information into structured knowledge.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 cursor-pointer hover:scale-105 transition">
              Get Started
            </button>
            <button className="text-white px-4 py-2 rounded border border-white cursor-pointer hover:scale-105 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center p-8 text-black bg-white">
        <div>
          <h1 className="text-center text-4xl font-bold mb-6">
            Why Choose AI Notes?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 w-full max-w-5xl">
          <div className="flex flex-col items-center text-center p-4">
            <BrainCircuit className="w-10 h-10 mb-2" />
            <h2 className="text-xl font-semibold">AI Summarization</h2>
            <p className="text-gray-600">
              Instantly condense long notes into key takeaways.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Link className="w-10 h-10 mb-2" />
            <h2 className="text-xl font-semibold">Smart Linking</h2>
            <p className="text-gray-600">
              Discover hidden connections between your ideas.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Search className="w-10 h-10 mb-2" />
            <h2 className="text-xl font-semibold">Semantic Search</h2>
            <p className="text-gray-600">
              Find anything with natural language, not just keywords.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
