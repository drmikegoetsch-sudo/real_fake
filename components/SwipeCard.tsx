'use client'

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'

interface SwipeCardProps {
  onSwipe: (direction: 'left' | 'right') => void
  children: React.ReactNode
}

export function SwipeCard({ onSwipe, children }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-12, 12])
  const controls = useAnimation()

  // Label opacity: appears once you drag past 40px
  const realOpacity = useTransform(x, [40, 120], [0, 1])
  const fakeOpacity = useTransform(x, [-120, -40], [1, 0])

  const handleDragEnd = async (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 110
    if (info.offset.x > threshold) {
      await controls.start({ x: 600, opacity: 0, transition: { duration: 0.25 } })
      onSwipe('right')
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -600, opacity: 0, transition: { duration: 0.25 } })
      onSwipe('left')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } })
    }
  }

  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* FAKE stamp */}
      <motion.div
        className="absolute left-5 top-8 z-20 rotate-[-20deg] pointer-events-none"
        style={{ opacity: fakeOpacity }}
      >
        <span className="text-2xl font-bold tracking-widest border-2 border-black text-black px-3 py-1 rounded uppercase">
          Fake
        </span>
      </motion.div>

      {/* REAL stamp */}
      <motion.div
        className="absolute right-5 top-8 z-20 rotate-[20deg] pointer-events-none"
        style={{ opacity: realOpacity }}
      >
        <span className="text-2xl font-bold tracking-widest border-2 border-black text-black px-3 py-1 rounded uppercase">
          Real
        </span>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        style={{ x, rotate }}
        animate={controls}
        onDragEnd={handleDragEnd}
        className="w-full cursor-grab active:cursor-grabbing"
        whileTap={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
