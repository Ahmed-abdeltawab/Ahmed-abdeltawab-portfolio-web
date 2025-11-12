'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CursorGlowTrail() {
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setIsMounted(true)

    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mediaQuery.matches)

    // Update on media query change
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDesktop, cursorX, cursorY])

  // Don't render on server or mobile
  if (!isMounted || !isDesktop) {
    return null
  }

  return (
    <>
      {/* Main glow cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 h-[25em] w-[25em] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[4em]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          background:
            'radial-gradient(circle, oklch(0.75 0.25 195 / 0.8) 0%, oklch(0.75 0.22 320 / 0.5) 50%, transparent 70%)',
        }}
      />

      {/* Secondary smaller glow */}
      <motion.div
        className="pointer-events-none fixed z-50 h-[15em] w-[15em] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[3em]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          background:
            'radial-gradient(circle, oklch(0.75 0.25 195 / 1) 0%, oklch(0.75 0.22 320 / 0.6) 40%, transparent 70%)',
        }}
      />

      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 h-[1em] w-[1em] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/20 blur-[0.1em]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
    </>
  )
}
