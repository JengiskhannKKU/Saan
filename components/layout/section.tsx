"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "default" | "muted" | "card" | "accent"
  animate?: boolean
  id?: string
}

const paddingClasses = {
  none: "",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-24",
}

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted",
  card: "bg-card",
  accent: "bg-accent",
}

export function Section({
  children,
  className,
  padding = "md",
  background = "default",
  animate = true,
  id,
}: SectionProps) {
  const sectionClasses = cn(paddingClasses[padding], backgroundClasses[background], className)

  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={sectionClasses}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <section id={id} className={sectionClasses}>
      {children}
    </section>
  )
}
