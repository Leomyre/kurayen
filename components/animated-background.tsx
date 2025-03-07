"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Grid properties
    const gridSize = 40
    const nodeRadius = 1.5
    const maxDistance = 180
    const particleCount = 80
    const particleBaseSpeed = 0.3
    const mouseInfluenceRadius = 200
    const mouseForce = 0.08

    // Digital rain properties
    const rainDrops: RainDrop[] = []
    const rainDropCount = 30
    const rainSpeed = 2
    const characters = "01"

    class RainDrop {
      x: number
      y: number
      speed: number
      length: number
      char: string
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height - canvas.height
        this.speed = rainSpeed + Math.random() * 2
        this.length = 10 + Math.random() * 30
        this.char = characters.charAt(Math.floor(Math.random() * characters.length))
        this.opacity = 0.1 + Math.random() * 0.5
        this.color = Math.random() > 0.5 ? "#ff003c" : "#0066cc"
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = -this.length
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.font = "14px monospace"
        ctx.fillStyle = this.color

        for (let i = 0; i < this.length; i++) {
          const charOpacity = this.opacity * (1 - i / this.length)
          ctx.globalAlpha = charOpacity
          ctx.fillText(this.char, this.x, this.y - i * 14)

          // Randomly change character
          if (Math.random() > 0.95) {
            this.char = characters.charAt(Math.floor(Math.random() * characters.length))
          }
        }
        ctx.globalAlpha = 1
      }
    }

    // Create rain drops
    for (let i = 0; i < rainDropCount; i++) {
      rainDrops.push(new RainDrop())
    }

    // Create particles
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      originalSize: number
      trail: { x: number; y: number; alpha: number }[]
      maxTrailLength: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * particleBaseSpeed
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.color = Math.random() > 0.5 ? "#ff003c" : "#0066cc"
        this.size = nodeRadius * (0.8 + Math.random() * 0.5)
        this.originalSize = this.size
        this.trail = []
        this.maxTrailLength = 5 + Math.floor(Math.random() * 10)
      }

      update() {
        // Add current position to trail
        this.trail.unshift({ x: this.x, y: this.y, alpha: 1 })

        // Limit trail length
        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop()
        }

        // Update trail alpha
        this.trail.forEach((point, index) => {
          point.alpha = 1 - index / this.maxTrailLength
        })

        // Apply mouse influence
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluenceRadius && distance > 0) {
          const force = (1 - distance / mouseInfluenceRadius) * mouseForce
          this.vx += (dx / distance) * force
          this.vy += (dy / distance) * force

          // Increase size when near mouse
          this.size = this.originalSize * (1 + (1 - distance / mouseInfluenceRadius) * 2)
        } else {
          this.size = this.originalSize
        }

        // Apply velocity
        this.x += this.vx
        this.y += this.vy

        // Add slight random movement
        this.vx += (Math.random() - 0.5) * 0.01
        this.vy += (Math.random() - 0.5) * 0.01

        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > particleBaseSpeed * 2) {
          this.vx = (this.vx / speed) * particleBaseSpeed * 2
          this.vy = (this.vy / speed) * particleBaseSpeed * 2
        }

        // Bounce off edges with slight dampening
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx * 0.9
          this.x = this.x < 0 ? 0 : canvas.width
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy = -this.vy * 0.9
          this.y = this.y < 0 ? 0 : canvas.height
        }
      }

      draw() {
        if (!ctx) return

        // Draw trail
        for (let i = 1; i < this.trail.length; i++) {
          const prev = this.trail[i - 1]
          const current = this.trail[i]

          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(current.x, current.y)
          ctx.strokeStyle =
            this.color +
            Math.floor(current.alpha * 99)
              .toString(16)
              .padStart(2, "0")
          ctx.lineWidth = this.size * current.alpha
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Add glow effect - with safety checks
        try {
          // Ensure all values are finite numbers
          if (isFinite(this.x) && isFinite(this.y) && isFinite(this.size) && this.size > 0) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)

            const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.5, this.x, this.y, this.size * 2)

            gradient.addColorStop(0, this.color + "80")
            gradient.addColorStop(1, this.color + "00")

            ctx.fillStyle = gradient
            ctx.fill()
          } else {
            // Fallback if values are invalid
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = this.color + "40"
            ctx.fill()
          }
        } catch (error) {
          // Fallback rendering in case of error
          console.error("Error in particle glow effect:", error)
        }
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw grid with pulse effect
    let pulseTime = 0
    const drawGrid = () => {
      if (!ctx) return

      pulseTime += 0.01
      const pulseIntensity = (Math.sin(pulseTime) + 1) * 0.5 * 0.05 + 0.05

      ctx.strokeStyle = `rgba(50, 50, 50, ${pulseIntensity})`
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Draw connections between particles
    const drawConnections = () => {
      if (!ctx) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            try {
              const opacity = (1 - distance / maxDistance) * 0.5

              // Ensure all coordinates are valid
              if (
                isFinite(particles[i].x) &&
                isFinite(particles[i].y) &&
                isFinite(particles[j].x) &&
                isFinite(particles[j].y)
              ) {
                const gradient = ctx.createLinearGradient(
                  particles[i].x,
                  particles[i].y,
                  particles[j].x,
                  particles[j].y,
                )

                gradient.addColorStop(
                  0,
                  `${particles[i].color}${Math.floor(opacity * 99)
                    .toString(16)
                    .padStart(2, "0")}`,
                )
                gradient.addColorStop(
                  1,
                  `${particles[j].color}${Math.floor(opacity * 99)
                    .toString(16)
                    .padStart(2, "0")}`,
                )

                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = gradient
                ctx.lineWidth = opacity * 1.5
                ctx.stroke()
              }
            } catch (error) {
              // Fallback in case of error
              console.error("Error in connection drawing:", error)
            }
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw background
        ctx.fillStyle = "rgba(0, 0, 0, 0.95)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw digital rain
        rainDrops.forEach((drop) => {
          drop.update()
          drop.draw()
        })

        // Draw grid
        drawGrid()

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        // Draw connections
        drawConnections()

        animationRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
        // Restart animation on error
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}

