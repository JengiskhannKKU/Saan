"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useMediaQuery, useTheme } from "@mui/material"
import { Navbar } from "@/components/navigation/navbar"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectSidebarOpen } from "@/lib/redux/selectors"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const sidebarOpen = useAppSelector(selectSidebarOpen)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`transition-all duration-300 ${isMobile ? "pb-16" : ""}`}
      >
        {children}
      </motion.main>

      <MobileNav />
    </div>
  )
}
