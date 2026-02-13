import AnimatedBackground from './components/AnimatedBackground'
import ValentineForm from './components/ValentineForm'
import { Heart } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center">
      <AnimatedBackground />

      <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 font-medium text-sm mb-6 border border-rose-200">
          <Heart size={14} className="fill-current" />
          <span>Valentine's Day 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-rose-600 mb-6 drop-shadow-sm">
          Wish your <br />
          <span className="text-rose-500 italic">Valentine</span>
        </h1>

        <p className="text-lg md:text-xl text-rose-900/70 mb-12 max-w-xl mx-auto leading-relaxed">
          Create a personalized digital card for your special someone and let them know how much they mean to you.
        </p>

        <div className="flex flex-col items-center gap-4">
          <ValentineForm />
          <p className="text-sm text-rose-400 font-medium">It's free and takes 30 seconds</p>
        </div>
      </div>

      <footer className="absolute bottom-8 text-rose-300 text-sm font-medium">
        Made with ❤️ for you
      </footer>
    </main>
  )
}
