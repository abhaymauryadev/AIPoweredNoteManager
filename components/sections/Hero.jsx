import React from 'react'

export default function Hero() {
    return (
        <section className='text-center h-screen flex flex-col items-center justify-center'>
            <div className=''>
                <h1 className=' sm:text-3xl md:text-5xl lg:text-6xl text-2xl font-bold border mb-6 '>Capture Ideas, Unlock Intelligence. <br />
                    The Future of Note-taking.
                </h1>

                <p className='text-gray-600 max-w-6xl mx-auto  border sm:text-[12px] md:text-[16px] lg:text-[18px] text-[10px] '>AI Notes uses advanced AI to organize, summarize, and
                    connect your thoughts. <br /> Turn scattered information into
                    structured knowledge.
                </p>
            </div>

            <div className='flex gap-4 mt-6'>
                <button className='bg-blue-600 text-black px-4 py-2 rounded-full border border-blue-600'>Get Started</button>
                <button className='bg-blue-600 text-black px-4 py-2 rounded-full border border-blue-600'>Watch Demo</button>
            </div>
        </section>
    )
}
