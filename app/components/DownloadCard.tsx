'use client'

import { useState } from 'react'
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import { Download, Link as LinkIcon, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface DownloadCardProps {
    cardId: string
    cardRef: React.RefObject<HTMLDivElement | null>
}

export default function DownloadCard({ cardId, cardRef }: DownloadCardProps) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleDownload = async () => {
        if (!cardRef.current) return

        setIsDownloading(true)
        try {
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: 'transparent',
            })
            download(dataUrl, `valentine-card-${cardId}.png`)
        } catch (err) {
            console.error('oops, something went wrong!', err)
        } finally {
            setIsDownloading(false)
        }
    }

    const handleCopyLink = () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/card/${cardId}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-6 py-3 bg-white text-rose-500 border-2 border-rose-200 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
                {isDownloading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-rose-500 border-t-transparent" />
                ) : (
                    <Download size={20} />
                )}
                {isDownloading ? 'Preparing...' : 'Download PNG'}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 border-2 border-rose-100 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all"
            >
                {copied ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
                {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>
        </div>
    )
}
