"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Computer as ComputerIcon,
} from "@mui/icons-material"
import { useTheme as useNextTheme } from "next-themes"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import {
  selectUser,
  selectIsAuthenticated,
  selectMobileMenuOpen,
  selectNotifications,
  selectUnreadNotifications,
} from "@/lib/redux/selectors"
import { toggleMobileMenu, setMobileMenuOpen } from "@/lib/redux/slices/ui-slice"
import { useSupabaseAuth } from "@/lib/supabase/auth"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Profile", href: "/profile", icon: PersonIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
]

export function Navbar() {
  const pathname = usePathname()
  const muiTheme = useTheme()
  const { theme, setTheme } = useNextTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen)
  const notifications = useAppSelector(selectNotifications)
  const unreadNotifications = useAppSelector(selectUnreadNotifications)

  const { signOut } = useSupabaseAuth()

  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [themeMenuAnchor, setThemeMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [notificationMenuAnchor, setNotificationMenuAnchor] = React.useState<null | HTMLElement>(null)

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget)
  }

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null)
  }

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget)
  }

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null)
  }

  const handleSignOut = async () => {
    await signOut()
    handleUserMenuClose()
  }

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu())
  }

  const handleMobileMenuClose = () => {
    dispatch(setMobileMenuOpen(false))
  }

  const themeIcon = theme === "dark" ? <DarkModeIcon /> : theme === "light" ? <LightModeIcon /> : <ComputerIcon />

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
        elevation={0}
      >
        <Toolbar className="px-4 lg:px-6">
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              className="mr-2 text-foreground hover:bg-accent"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Typography variant="h6" className="text-primary-foreground font-bold">
                  {"A"}
                </Typography>
              </div>
              <Typography variant="h6" className="text-foreground font-semibold hidden sm:block">
                {"App"}
              </Typography>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-1 ml-8"
            >
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      className={cn(
                        "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative",
                        isActive && "text-foreground bg-accent",
                      )}
                      startIcon={<item.icon />}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                )
              })}
            </motion.nav>
          )}

          <div className="flex-1" />

          {/* Right side actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            {/* Theme toggle */}
            <IconButton
              onClick={handleThemeMenuOpen}
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {themeIcon}
            </IconButton>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <IconButton
                  onClick={handleNotificationMenuOpen}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Badge badgeContent={unreadNotifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                {/* User menu */}
                <IconButton onClick={handleUserMenuOpen} className="ml-2">
                  <Avatar
                    src={user?.avatar_url}
                    alt={user?.name || user?.email}
                    className="w-8 h-8 bg-primary text-primary-foreground"
                  >
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outlined" size="small" className="border-border text-foreground hover:bg-accent">
                    {"Sign In"}
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button variant="contained" size="small" className="bg-primary text-primary-foreground">
                    {"Sign Up"}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        className="md:hidden"
        PaperProps={{
          className: "w-64 bg-background border-r border-border",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Typography variant="h6" className="text-foreground font-semibold">
            {"Menu"}
          </Typography>
          <IconButton onClick={handleMobileMenuClose} className="text-muted-foreground">
            <CloseIcon />
          </IconButton>
        </div>

        <List className="flex-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={handleMobileMenuClose}>
                <ListItem
                  className={cn(
                    "hover:bg-accent transition-colors",
                    isActive && "bg-accent text-foreground border-r-2 border-primary",
                  )}
                >
                  <ListItemIcon className={cn("text-muted-foreground", isActive && "text-primary")}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    className={cn("text-muted-foreground", isActive && "text-foreground")}
                  />
                </ListItem>
              </Link>
            )
          })}
        </List>

        {isAuthenticated && (
          <>
            <Divider className="border-border" />
            <List>
              <ListItem onClick={handleSignOut} className="hover:bg-accent transition-colors cursor-pointer">
                <ListItemIcon className="text-muted-foreground">
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" className="text-muted-foreground" />
              </ListItem>
            </List>
          </>
        )}
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          className: "bg-background border border-border shadow-lg",
        }}
      >
        <div className="px-4 py-2 border-b border-border">
          <Typography variant="subtitle2" className="text-foreground font-medium">
            {user?.name || "User"}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            {user?.email}
          </Typography>
        </div>
        <MenuItem onClick={handleUserMenuClose} className="text-muted-foreground hover:bg-accent">
          <PersonIcon className="mr-2" />
          {"Profile"}
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} className="text-muted-foreground hover:bg-accent">
          <SettingsIcon className="mr-2" />
          {"Settings"}
        </MenuItem>
        <Divider className="border-border" />
        <MenuItem onClick={handleSignOut} className="text-muted-foreground hover:bg-accent">
          <LogoutIcon className="mr-2" />
          {"Sign Out"}
        </MenuItem>
      </Menu>

      {/* Theme Menu */}
      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        PaperProps={{
          className: "bg-background border border-border shadow-lg",
        }}
      >
        <MenuItem
          onClick={() => {
            setTheme("light")
            handleThemeMenuClose()
          }}
          className="text-muted-foreground hover:bg-accent"
        >
          <LightModeIcon className="mr-2" />
          {"Light"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("dark")
            handleThemeMenuClose()
          }}
          className="text-muted-foreground hover:bg-accent"
        >
          <DarkModeIcon className="mr-2" />
          {"Dark"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("system")
            handleThemeMenuClose()
          }}
          className="text-muted-foreground hover:bg-accent"
        >
          <ComputerIcon className="mr-2" />
          {"System"}
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          className: "bg-background border border-border shadow-lg w-80",
        }}
      >
        <div className="px-4 py-2 border-b border-border">
          <Typography variant="subtitle2" className="text-foreground font-medium">
            {"Notifications"}
          </Typography>
        </div>
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <MenuItem key={notification.id} className="text-muted-foreground hover:bg-accent whitespace-normal">
              <div className="flex flex-col">
                <Typography variant="body2" className="text-foreground">
                  {notification.message}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem className="text-muted-foreground">
            <Typography variant="body2">{"No notifications"}</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
