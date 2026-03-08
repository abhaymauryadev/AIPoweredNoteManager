import React from "react";
// import Image from '../components/common/Image'
import Image from "next/image";
import { WandSparkles, Link } from "lucide-react";

export default function Features() {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center">
        <div className="text-center bg-white text-black ">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
            Beyond Note-Taking <br />
            Intelligent Through Management
          </h1>
        </div>

        <p className="text-gray-600 max-w-4xl mx-auto   mt-12 sm:text-[16px] md:text-[20px] lg:text-[24px] text-[10px] leading-6 ">
          Experience the future of note-taking with AI Notes. Our advanced AI
          technology helps you organize, summarize, and connect your thoughts
          effortlessly.
        </p>

        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full border border-blue-600 cursor-pointer hover:scale-105 transition">
            Get Started for free
          </button>
          <button className="text-black px-4 py-2 rounded-full border  cursor-pointer hover:scale-105 transition">
            Watch Demo
          </button>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8 text-left">
          {/* Badge */}
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-indigo-100 text-indigo-600 rounded-full">
            AI-DRIVEN ORGANIZATION
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Clean your mental clutter automatically.
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-lg">
            No more manual folder sorting or tag management. AI notes manager
            engine analyzes your writing in real-time to organize everything
            logically.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md ">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <WandSparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-left">
                  Instant Summarization
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-left">
                  Condense long meeting transcripts or research papers into
                  actionable bullet points instantly.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md ">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Link size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-left">
                  Smart Linking
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-left">
                  Connect related notes from months ago, building your personal
                  knowledge graph automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center ">
          <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
            <Image
              src="/your-image.png"
              alt="AI Organization"
              width={500}
              height={500}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest uppercase bg-indigo-100 text-indigo-600 rounded-full">
            SMART RETRIEVAL
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
            Find anything. Even if you don't know what you're looking for.
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Our semantic search doesn't just look for keywords. It understands
            the context and intent behind your queries.
          </p>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-white rounded-2xl shadow-md  hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="mt-6 font-semibold text-lg text-gray-900">
                Natural Language Search
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Ask questions the way you naturally think. No need for exact
                phrasing or perfect keywords.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-white rounded-2xl shadow-md  hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="mt-6 font-semibold text-lg text-gray-900">
                Context Awareness
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                The system understands relationships between your notes and
                retrieves what truly matters.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-white rounded-2xl shadow-md  hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="mt-6 font-semibold text-lg text-gray-900">
                Instant Results
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Get relevant results in milliseconds without manually filtering
                or sorting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-center ">
          <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
            <Image
              src="/your-image.png"
              alt="AI Organization"
              width={500}
              height={500}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8 text-left">
          {/* Badge */}
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-indigo-100 text-indigo-600 rounded-full">
            SEAMLESS EXPERIENCE
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-10 tracking-tight">
            Focus on writing, we'll handle the rest.
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-lg">
            AI Notes is built for creators, thinkers, and builders. A
            distraction-free environment that sync across every device you own.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md ">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <WandSparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-left">
                  Instant Summarization
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-left">
                  Condense long meeting transcripts or research papers into
                  actionable bullet points instantly.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md ">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Link size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-left">
                  Smart Linking
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-left">
                  Connect related notes from months ago, building your personal
                  knowledge graph automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shadow-xl max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 gap-6 rounded-lg text-center">
          <div>
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
              Ready to elevate your knowledge
            </h1>
          </div>

          <p className="lg:text-lg text-gray-600 mb-6">
            Join over 50,000 thinkers who have revolutionized their workflow
            with AI Notes Managers
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get started – It's Free
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
