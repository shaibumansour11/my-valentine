'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendReplyEmail } from '../actions'
import { Heart, Send, Check, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ReplyButton({ valentineId }: { valentineId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [answer, setAnswer] = useState('')

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await sendReplyEmail(valentineId, answer)
        setLoading(false)
        if (res.success) {
            setSent(true)
            setTimeout(() => {
                setIsOpen(false)
                setSent(false)
                setAnswer('')
            }, 3000)
        }
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-2xl shadow-xl hover:shadow-rose-200/50 transition-all flex items-center gap-3"
            >
                <Heart className="fill-current" />
                Reply Yes!
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
                            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100"
                        >
                            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white text-center relative">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <h2 className="text-2xl font-bold">Send your Answer</h2>
                            </div>

                            <div className="p-8">
                                {!sent ? (
                                    <form onSubmit={handleReply} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Write a small message (optional)</label>
                                            <textarea
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all min-h-[100px] resize-none text-rose-900 placeholder:text-rose-300"
                                                placeholder="e.g. YES! I'd love to! ❤️"
                                            />
                                        </div>

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
                                                    Send Answer
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-8 space-y-4">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check size={40} className="text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">Sent!</h3>
                                        <p className="text-gray-500 mb-8">Your answer has been sent via email. ❤️</p>

                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-rose-500/30 transition-all hover:scale-[1.02]"
                                        >
                                            <Heart className="fill-current" size={18} />
                                            Get Your Own Card
                                        </Link>
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
