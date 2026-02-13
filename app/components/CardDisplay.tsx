'use client'

import { useRef } from 'react'
import { Heart } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import ReplyButton from './ReplyButton'
import DownloadCard from './DownloadCard'

interface CardDisplayProps {
    valentine: {
        id: string
        recipientName: string
        senderName: string
    }
}

export default function CardDisplay({ valentine }: CardDisplayProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center overflow-x-hidden">
            <AnimatedBackground />

            <div
                ref={cardRef}
                className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-[3rem] p-12 shadow-2xl border border-rose-100 animate-in zoom-in duration-700 relative z-10"
            >
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <Heart size={80} className="text-rose-500 fill-rose-100 animate-pulse" />
                        <Heart size={30} className="text-rose-400 fill-rose-400 absolute -top-2 -right-2 rotate-12" />
                    </div>
                </div>

                <h2 className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-4">A Special Message</h2>

                <div className="space-y-6 mb-12">
                    <p className="text-3xl md:text-4xl font-black text-rose-600 leading-tight">
                        My love <span className="text-rose-500 italic underline decoration-rose-200">{valentine.recipientName}</span>,
                        you will be my valentine.
                    </p>
                    <div className="h-px w-24 bg-rose-200 mx-auto" />
                    <p className="text-xl text-rose-400 font-medium">
                        By <span className="font-bold text-rose-600">{valentine.senderName}</span>
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <ReplyButton valentineId={valentine.id} />
                    <p className="text-xs text-rose-300 font-medium italic">Click to send a response back!</p>
                </div>
            </div>

            <DownloadCard cardId={valentine.id} cardRef={cardRef} />

            <footer className="mt-12 text-rose-300 text-sm font-medium relative z-10">
                Made with ❤️ for {valentine.recipientName}
            </footer>
        </main>
    )
}
