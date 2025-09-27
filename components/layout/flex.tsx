"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlexProps {
  children: React.ReactNode
  className?: string
  direction?: "row" | "col" | "row-reverse" | "col-reverse"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: "none" | "sm" | "md" | "lg" | "xl"
  animate?: boolean
}

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
}

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

const wrapClasses = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

export function Flex({
  children,
  className,
  direction = "row",
  align = "start",
  justify = "start",
  wrap = "nowrap",
  gap = "none",
  animate = true,
}: FlexProps) {
  const flexClasses = cn(
    "flex",
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrapClasses[wrap],
    gapClasses[gap],
    className,
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={flexClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={flexClasses}>{children}</div>
}
