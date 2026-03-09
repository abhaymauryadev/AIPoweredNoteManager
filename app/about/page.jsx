import React from "react";
import Image from "next/image";
import { WandSparkles, Link } from "lucide-react";
// import Link from 'next/link'
export default function About() {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center">
        <div className="text-black">
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-7xl text-center font-bold tracking-tighter">
            Our Mission to Amplify Human <br /> Intelligence
          </h1>
          <p className="text-center text-sm sm:text-4xl lg:text-[20px] pt-6 text-gray-600">
            We believe that the future of knowledge work lies on the seamless
            harmony between human creativity and artifical Intelligence{" "}
          </p>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 class="text-3xl font-bold mb-6 text-black dark:text-white">
            Built for the thinkers and the builders.
          </h2>
          <div class="space-y-4 text-black  text-lg leading-relaxed">
            <p>
              Aura Notes started with a simple observation: our digital lives
              are becoming increasingly fragmented. Great ideas are often lost
              in a sea of browser tabs, disconnected documents, and fleeting
              thoughts.
            </p>
            <p>
              Founded in 2023, our goal was to build more than just a notebook.
              We wanted to build a second brain—an intelligent partner that
              doesn't just store information, but understands it.
            </p>
            <p>
              Today, thousands of writers, researchers, and engineers use Aura
              Notes to synthesize their learnings and unlock new levels of
              productivity through AI-driven insights.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div class="relative">
          <div class="aspect-square rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center p-8">
            <img
              alt="Abstract visualization of connected thoughts"
              class="rounded-xl shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC76wuoA55FClbFQwxVLTAsYovLPoqEYOVpwN-Cy5HYcjB_wHdrglaDaFXDxWX6qvuVYICdlqZRdkUsw2TCRXoPQ8i3Ol5gOItNNZp1vquFCgkyDNR0Db45nEZkcAlm-D0dH5_VE07mIvsvbpYmRdbP8c22wYqjz3XxxblcYnwwvi9VnOFnuSqLze6Uy8G5QTcO3x2qAJ6ACb6s7rlJ960yBr7IxfMnN5_I6m3EgxBp6PTGoOpZ2Qi0Rr70RcOTYtxKXo1yasAGN6o"
            />
          </div>
        </div>
      </section>
    </>
  );
}
