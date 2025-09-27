"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "none" | "sm" | "md" | "lg" | "xl"
  animate?: boolean
  stagger?: boolean
}

interface GridItemProps {
  children: React.ReactNode
  className?: string
  span?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  animate?: boolean
  delay?: number
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const getColsClasses = (cols: GridProps["cols"]) => {
  const classes = []
  if (cols?.default) classes.push(`grid-cols-${cols.default}`)
  if (cols?.sm) classes.push(`sm:grid-cols-${cols.sm}`)
  if (cols?.md) classes.push(`md:grid-cols-${cols.md}`)
  if (cols?.lg) classes.push(`lg:grid-cols-${cols.lg}`)
  if (cols?.xl) classes.push(`xl:grid-cols-${cols.xl}`)
  return classes.join(" ")
}

const getSpanClasses = (span: GridItemProps["span"]) => {
  const classes = []
  if (span?.default) classes.push(`col-span-${span.default}`)
  if (span?.sm) classes.push(`sm:col-span-${span.sm}`)
  if (span?.md) classes.push(`md:col-span-${span.md}`)
  if (span?.lg) classes.push(`lg:col-span-${span.lg}`)
  if (span?.xl) classes.push(`xl:col-span-${span.xl}`)
  return classes.join(" ")
}

export function Grid({
  children,
  className,
  cols = { default: 1, md: 2, lg: 3 },
  gap = "md",
  animate = true,
  stagger = true,
}: GridProps) {
  const gridClasses = cn("grid", getColsClasses(cols), gapClasses[gap], className)

  if (animate && stagger) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className={gridClasses}
      >
        {children}
      </motion.div>
    )
  }

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={gridClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={gridClasses}>{children}</div>
}

export function GridItem({ children, className, span, animate = true, delay = 0 }: GridItemProps) {
  const itemClasses = cn(getSpanClasses(span), className)

  if (animate) {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3, delay }}
        className={itemClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={itemClasses}>{children}</div>
}
