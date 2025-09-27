"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material"
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Profile", href: "/profile", icon: PersonIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
]

export function MobileNav() {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // if (!isMobile) return null

  const currentIndex = navigationItems.findIndex((item) => item.href === pathname)

  return (
    <Paper
      elevation={8}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border md:hidden"
    >
      <BottomNavigation
        value={currentIndex}
        className="bg-transparent"
        sx={{
          "& .MuiBottomNavigationAction-root": {
            color: "var(--color-muted-foreground)",
            "&.Mui-selected": {
              color: "var(--color-primary)",
            },
          },
        }}
      >
        {navigationItems.map((item, index) => (
          <BottomNavigationAction
            key={item.name}
            label={item.name}
            icon={
              <div className="relative">
                <item.icon />
                {currentIndex === index && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            }
            component={Link}
            href={item.href}
            className={cn("transition-colors", currentIndex === index && "text-primary")}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
