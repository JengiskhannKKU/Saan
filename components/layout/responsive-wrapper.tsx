"use client"

import type React from "react"
import { useMediaQuery, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ResponsiveWrapperProps {
  children: React.ReactNode
  className?: string
  mobileLayout?: React.ReactNode
  tabletLayout?: React.ReactNode
  desktopLayout?: React.ReactNode
  animate?: boolean
}

export function ResponsiveWrapper({
  children,
  className,
  mobileLayout,
  tabletLayout,
  desktopLayout,
  animate = true,
}: ResponsiveWrapperProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"))
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"))

  const getLayout = () => {
    if (isMobile && mobileLayout) return mobileLayout
    if (isTablet && tabletLayout) return tabletLayout
    if (isDesktop && desktopLayout) return desktopLayout
    return children
  }

  const wrapperClasses = cn("w-full", className)

  if (animate) {
    return (
      <motion.div
        key={`${isMobile}-${isTablet}-${isDesktop}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={wrapperClasses}
      >
        {getLayout()}
      </motion.div>
    )
  }

  return <div className={wrapperClasses}>{getLayout()}</div>
}
