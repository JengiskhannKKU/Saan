"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  animate?: boolean
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
}

const paddingClasses = {
  none: "",
  sm: "px-4 py-2",
  md: "px-6 py-4",
  lg: "px-8 py-6",
}

export function Container({ children, className, maxWidth = "xl", padding = "md", animate = true }: ContainerProps) {
  const containerClasses = cn("mx-auto w-full", maxWidthClasses[maxWidth], paddingClasses[padding], className)

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={containerClasses}>{children}</div>
}
