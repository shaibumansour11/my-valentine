'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Heart = ({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) => (
    <motion.div
        initial={{ y: '110vh', opacity: 0, scale: 0 }}
        animate={{ y: '-10vh', opacity: [0, 1, 1, 0], scale: [0, 1, 1.2, 0.8] }}
        transition={{
            delay,
            duration,
            repeat: Infinity,
            ease: 'linear'
        }}
        className="absolute pointer-events-none text-rose-400/30"
        style={{ left, fontSize: size }}
    >
        ❤️
    </motion.div>
)

export default function AnimatedBackground() {
    const [hearts, setHearts] = useState<{ id: number; delay: number; duration: number; left: string; size: number }[]>([])

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 20,
            duration: 10 + Math.random() * 20,
            left: `${Math.random() * 100}%`,
            size: 10 + Math.random() * 30
        }))
        setHearts(newHearts)
    }, [])

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
            <div className="absolute inset-0 opacity-40">
                <Image
                    src="/valentine.png"
                    alt="Valentine Background"
                    fill
                    className="object-contain p-4 md:p-12 animate-pulse-slow"
                    priority
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                />
            </div>

            {hearts.map((heart) => (
                <Heart key={heart.id} {...heart} />
            ))}

            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        </div>
    )
}
