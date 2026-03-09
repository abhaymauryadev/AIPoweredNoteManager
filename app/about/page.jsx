import React from "react";
import Image from "next/image";
import { WandSparkles, Link } from "lucide-react";
import Footer from "@/components/common/Footer";
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

      <section class="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-16 text-slate-900 dark:text-white">
            Our Core Values
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span class="material-symbols-outlined">shield</span>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Privacy First
              </h3>
              <p class="text-slate-600 dark:text-slate-400">
                Your thoughts are yours alone. We use state-of-the-art
                encryption to ensure your data remains private and secure.
              </p>
            </div>
            <div class="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span class="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Intuitive Design
              </h3>
              <p class="text-slate-600 dark:text-slate-400">
                We believe that powerful tools should be easy to use. Our
                interface stays out of your way so you can focus on creating.
              </p>
            </div>
            <div class="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span class="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Constant Innovation
              </h3>
              <p class="text-slate-600 dark:text-slate-400">
                The AI landscape is moving fast. We're committed to bringing you
                the latest breakthroughs in LLM technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-white dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Meet the Visionaries
            </h2>
            <p class="text-slate-600 dark:text-slate-400">
              The small but mighty team building the future of memory.
            </p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-800 group-hover:border-primary transition-colors">
                <img
                  alt="Alex Chen"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtc3_tSk28hN5JKR3lCo_K7XyGaSFVZ30DwAy6bQp0i2iz8Mbk9t8ne1p7k6x4gncRucL1ewElMACQ7V5iQF41yeibUcxUK-1jrnO1HxbqmuDilDolzhv17o96yZc9KVOOs3BgGk_H3m_S3sVkCTexZvnyp2Jx6EyEFOjzbq_0eM694XTAcSW6jzTLepcN6qfZxcxf01FNHGnOQfSB_q5tI1PnIdBn145FpiA2fbXHqpbWGjvyCQkggPWfTeHB5r8mXzkKA20eiv4"
                />
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white">
                Alex Chen
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Co-founder &amp; CEO
              </p>
            </div>
            <div class="text-center group">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-800 group-hover:border-primary transition-colors">
                <img
                  alt="Sarah Jenkins"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoz1hFHh4EADYrK0fZlI5YTQsM3lB_Q0SxSKYQVlyugmgVXZcnRZR7Bms8GnpTxTeYlGQCIjKMChG-eNuz5_zYWLTekrZ2eCML9wlgmHrp_4hHxG3KcrtWuvR44n6ZzmbAPg45_q_knXDnvtEbrRNPmsHBfgKuRM8gZzopDzckUtuwneg6Iq64z-DVpA1OnSJJuL50XnMOlB23AFdMuBrGsMzD7rnDL93Cn9v21b62DcqCyth1yzCs2VmDjGv-_QlBKVVLQSoLObg"
                />
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white">
                Sarah Jenkins
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">CTO</p>
            </div>
            <div class="text-center group">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-800 group-hover:border-primary transition-colors">
                <img
                  alt="David Miller"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpFKA-1uf7lyKa7rPaxdc0ZOeycnpNKLHRQxuEjej6C6noEfZf_2foppoaJ4qjAD5vGbRphrma5RFrChODdIZlsdpaafTri2BOrnJ5M1rqR8hrDHB1RaVvyV8ZThisUhJusA6sVB5nAENFYAXQlysrAJMFQkGtT3w6rH8tLs2M0mVZuWiXfuvx17NQVbnrhTMd0zjjZx8UWB9eUf4mnqkXEYrHankVvnoA3ePjPR2JYIoEPfYKovXv2wGTUz3DJNLZbt5imskDOpI"
                />
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white">
                David Miller
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Head of Product
              </p>
            </div>
            <div class="text-center group">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-800 group-hover:border-primary transition-colors">
                <img
                  alt="Elena Rodriguez"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD19YGZCp32zclCG7HJNT0MEtoHJv_dyp99QuFPcmCIIv1iVmnlQHTz3oteffDPNNxHxfeBnOZyPfTNpwqeeZnIOsO7sThXcKT_MJAv2h8wnf4kU3hvqVkjR19qq5YOzc66VsBwaxqD3Dp7ZYZGkMdBlp_lmeCvMrKyHlF-oGeIaaZPUb8MFWQ-1PjE1m4qQ6s5Y5qJbsI5dZiw7Of1hTm-AtvtdocpYVFesnKRiKwLJA3ssbn7rNgKgsPLQp2_hi-h0nXkjUf91Yw"
                />
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white">
                Elena Rodriguez
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Lead AI Researcher
              </p>
            </div>
          </div>
        </div>
      </section>

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

          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-[15px] sm:text-lg md:text-xl lg:text-1xl text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get started – It's Free
            </button>

            <button className="border text-[15px] sm:text-lg md:text-xl lg:text-1xl border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}
