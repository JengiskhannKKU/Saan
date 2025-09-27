"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CardContent, CardHeader, CardActions, useMediaQuery, useTheme } from "@mui/material"
import { cn } from "@/lib/utils"

interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  actions?: React.ReactNode
  hover?: boolean
  animate?: boolean
  variant?: "default" | "outlined" | "elevated"
}

export function ResponsiveCard({
  children,
  className,
  header,
  actions,
  hover = true,
  animate = true,
  variant = "default",
}: ResponsiveCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const cardClasses = cn(
    "bg-card text-card-foreground border border-border transition-all duration-200",
    hover && "hover:shadow-lg hover:scale-[1.02]",
    variant === "outlined" && "border-2",
    variant === "elevated" && "shadow-md",
    isMobile ? "rounded-lg" : "rounded-xl",
    className,
  )

  const CardComponent = animate ? motion.div : "div"
  const cardProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        whileHover: hover ? { y: -2 } : undefined,
      }
    : {}

  return (
    <CardComponent className={cardClasses} {...cardProps}>
      {header && <CardHeader className={cn("pb-3", isMobile ? "px-4 pt-4" : "px-6 pt-6")}>{header}</CardHeader>}
      <CardContent className={cn(isMobile ? "px-4 py-3" : "px-6 py-4")}>{children}</CardContent>
      {actions && <CardActions className={cn("pt-0", isMobile ? "px-4 pb-4" : "px-6 pb-6")}>{actions}</CardActions>}
    </CardComponent>
  )
}
