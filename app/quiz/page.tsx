'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SwipeCard } from '@/components/SwipeCard'
import { QUESTIONS } from '@/lib/constants'

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSwipe = async (direction: 'left' | 'right') => {
    const answer = direction === 'right'
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setSubmitting(true)
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })
        if (!res.ok) {
          const body = await res.json()
          setSubmitError(body.error || 'Submit failed')
          setSubmitting(false)
          return
        }
        router.push('/done')
      } catch (e) {
        setSubmitError('Network error — check connection')
        setSubmitting(false)
      }
    }
  }

  const question = QUESTIONS[currentIndex]

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Progress bar */}
      <div className="flex gap-1.5 p-5 pt-8">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
              i < currentIndex
                ? 'bg-black'
                : i === currentIndex
                ? 'bg-black'
                : 'bg-gray-150'
            }`}
            style={{ backgroundColor: i <= currentIndex ? '#000' : '#e5e7eb' }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="px-5 pb-4">
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          {currentIndex + 1} of {QUESTIONS.length}
        </p>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SwipeCard onSwipe={handleSwipe}>
              <div
                className="relative w-full rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={question.src}
                  alt={question.alt}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                  draggable={false}
                />
              </div>
            </SwipeCard>
          </motion.div>
        </AnimatePresence>

        {/* Swipe hint */}
        <div className="mt-8 flex items-center gap-4 text-gray-300 text-sm">
          <span>← Fake</span>
          <span className="w-px h-4 bg-gray-200" />
          <span>Real →</span>
        </div>
      </div>

      {submitting && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {submitError && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-sm text-red-500 font-mono bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {submitError}
          </p>
          <button onClick={() => setSubmitError(null)} className="text-xs text-gray-400 underline">
            Try again
          </button>
        </div>
      )}
    </main>
  )
}
