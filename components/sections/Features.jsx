import React from 'react'
// import Image from '../components/common/Image'
import Image from 'next/image'
import { WandSparkles } from 'lucide-react';

export default function Features() {
    return (
        <>
        <section className='h-screen flex flex-col items-center justify-center'>
            <div className='text-center bg-white text-black '>
                <h1 className='text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold'>Beyond Note-Taking <br />Intelligent Through Management</h1>
            </div>

            <p className='text-gray-600 max-w-4xl mx-auto   mt-12 sm:text-[16px] md:text-[20px] lg:text-[24px] text-[10px] leading-6 '>Experience the future of note-taking with AI Notes. Our advanced AI technology helps you organize, summarize, and connect your thoughts effortlessly.</p>


            <div className='flex gap-4 mt-6'>
                <button className='bg-blue-600 text-white px-4 py-2 rounded-full border border-blue-600 cursor-pointer hover:scale-105 transition'>Get Started for free</button>
                <button className='text-black px-4 py-2 rounded-full border  cursor-pointer hover:scale-105 transition'>Watch Demo</button>
            </div>
        </section>

        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 w-full mx-auto max-w-5xl '>
            <div>
                <div className='text-center bg-blue-200 rounded-full '>
                    <h1 className='text-1xl font-bold uppercase text-blue-500 '>AI-Drvien organization</h1>
                    <p>No more manual folder sorting or tag management. AI notes manager engine analyzes your writing in real-time to organize everything logically.</p>
                </div>

                <div className='border shadow-md ' >
                    <WandSparkles/>
                    <h1>Instant Summarization</h1>
                    <p>Condense long meeting transcripts or research papers into actionable bullet points instantly</p>
                </div>
            </div>

            <div>
                <div>
                    <Image/>
                </div>
            </div>
        </section>
        </>
    )
}
