'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createValentine } from '../actions'
import { useRef } from 'react'
import { Heart, Send, Copy, Check, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import DownloadCard from './DownloadCard'

export default function ValentineForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ id: string } | null>(null)
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState({
        senderName: '',
        recipientName: '',
        email: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await createValentine(formData)
        setLoading(false)
        if (res.success && res.id) {
            setResult({ id: res.id })
        }
    }

    const cardRef = useRef<HTMLDivElement>(null)

    const copyLink = () => {
        if (!result) return
        const link = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/card/${result.id}`
        navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg border-2 border-rose-600 hover:bg-rose-600 transition-colors flex items-center gap-2"
            >
                <Heart className="fill-current" />
                Get yours
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="bg-rose-500 p-6 text-white text-center relative">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <Heart className="mx-auto mb-2 fill-white animate-bounce" size={40} />
                                <h2 className="text-2xl font-bold">Create a Wish</h2>
                            </div>

                            <div className="p-8">
                                {!result ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Valentine's Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.recipientName}
                                                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all text-rose-900 placeholder:text-rose-300"
                                                placeholder="e.g. My Love"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.senderName}
                                                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all text-rose-900 placeholder:text-rose-300"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email (to get the reply)</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all text-rose-900 placeholder:text-rose-300"
                                                placeholder="you@example.com"
                                            />
                                        </div>

                                        <p className="text-xs text-gray-500 text-center italic mt-4">
                                            "my love {formData.recipientName || '...'} you will be my valentine from {formData.senderName || '...'}"
                                        </p>

                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className={cn(
                                                "w-full py-4 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 transition-all",
                                                loading ? "bg-gray-200 cursor-not-allowed" : "bg-rose-500 text-white hover:bg-rose-600 active:scale-[0.98]"
                                            )}
                                        >
                                            {loading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    Create Wish
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center space-y-6">
                                        <div className="bg-rose-50 p-4 rounded-2xl">
                                            <p className="text-gray-600 mb-2 font-medium">Card Created! 🎉</p>

                                            {/* Preview Card for Downloading */}
                                            <div className="mb-4 overflow-hidden border border-rose-100 rounded-2xl bg-white shadow-inner">
                                                <div
                                                    ref={cardRef}
                                                    className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 text-center"
                                                >
                                                    <Heart size={40} className="text-rose-500 fill-rose-100 mx-auto mb-3" />
                                                    <p className="text-xl font-black text-rose-600 leading-tight mb-2">
                                                        My love <span className="text-rose-500">{formData.recipientName}</span>,
                                                        you will be my valentine ?.
                                                    </p>
                                                    <p className="text-sm text-rose-400 font-medium">
                                                        By <span className="font-bold text-rose-600">{formData.senderName}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 bg-white p-2 border border-rose-200 rounded-lg mb-4">
                                                <code className="flex-1 text-[10px] truncate text-rose-600">
                                                    {process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/card/{result.id}
                                                </code>
                                                <button
                                                    onClick={copyLink}
                                                    className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                                                >
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>

                                            <DownloadCard cardId={result.id} cardRef={cardRef} />
                                        </div>

                                        <button
                                            onClick={() => {
                                                setResult(null)
                                                setIsOpen(false)
                                                setFormData({ senderName: '', recipientName: '', email: '' })
                                            }}
                                            className="text-rose-500 font-medium hover:underline text-sm"
                                        >
                                            Create another one
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
