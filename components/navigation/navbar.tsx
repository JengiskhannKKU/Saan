"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Computer as ComputerIcon,
  Help,
} from "@mui/icons-material";
import { useTheme as useNextTheme } from "next-themes";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import {
  selectUser,
  selectIsAuthenticated,
  selectMobileMenuOpen,
} from "@/lib/redux/selectors";
import {
  toggleMobileMenu,
  setMobileMenuOpen,
} from "@/lib/redux/slices/ui-slice";
import { useSupabaseAuth } from "@/lib/supabase/auth";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const muiTheme = useTheme();
  const { theme, setTheme } = useNextTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);

  const { signOut } = useSupabaseAuth();
  const [role, setRole] = useState<string | null>(null);

  const [userMenuAnchor, setUserMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const [themeMenuAnchor, setThemeMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  // Navigation handlers
  const handleNavigate = (href: string) => router.push(href);

  const handleMobileNavigate = (href: string) => {
    dispatch(setMobileMenuOpen(false));
    setTimeout(() => router.push(href), 100);
  };

  // Menu handlers
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };
  const handleThemeMenuClose = () => setThemeMenuAnchor(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      handleUserMenuClose();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleMobileMenuToggle = () => dispatch(toggleMobileMenu());
  const handleMobileMenuClose = () => dispatch(setMobileMenuOpen(false));

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    handleThemeMenuClose();
  };

  const themeIcon =
    theme === "dark" ? (
      <DarkModeIcon />
    ) : theme === "light" ? (
      <LightModeIcon />
    ) : (
      <ComputerIcon />
    );

  // Load user role from Supabase
  useEffect(() => {
    const supabase = createClient();

    async function loadRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && data) setRole(data.role);
      }
    }

    loadRole();
  }, []);

  // Centralized navigation items
  const getNavigationItems = (role: string | null) => {
    const items = [
      { name: "Home", href: "/", icon: HomeIcon },
      { name: "ตะกร้า", href: "/dashboard", icon: DashboardIcon },
      { name: "โปรไฟล์", href: "/profile", icon: PersonIcon },
      { name: "Settings", href: "/settings", icon: SettingsIcon },
    ];

    // Only show roleAuth menu if user has no role
    if (!role) {
      items.push({
        name: "สมัครเป็นจิตอาสา/โบรคเกอร์",
        href: "/roleAuth",
        icon: Help,
      });
    }

    return items;
  };

  const navItems = getNavigationItems(role);

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "60px !important",
            px: { xs: 2, sm: 3 },
            justifyContent: "space-between",
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{
              color: "#333",
              p: 1,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Center Logo */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            <Image src="/saan_logo.png" alt="Saan Logo" width={100} height={32} />
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton sx={{ color: "#333", p: 1, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton sx={{ color: "#333", p: 1, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <ShoppingCartIcon sx={{ fontSize: 20 }} />
            </IconButton>

            {isAuthenticated ? (
              <IconButton onClick={handleUserMenuOpen} sx={{ p: 0.5, ml: 0.5 }}>
                <Avatar
                  src={user?.avatar_url}
                  sx={{ width: 28, height: 28, bgcolor: "#333", fontSize: "14px" }}
                >
                  {user?.name?.[0] || user?.email?.[0] || "U"}
                </Avatar>
              </IconButton>
            ) : (
              <IconButton onClick={handleUserMenuOpen} sx={{ color: "#333", p: 1, ml: 0.5, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                <PersonIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          "& .MuiDrawer-paper": { width: 280, backgroundColor: "#fff", boxShadow: "2px 0 8px rgba(0,0,0,0.1)" },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e5e5" }}>
          <Image src="/saan_logo.png" alt="Saan Logo" width={100} height={32} />
          <IconButton onClick={handleMobileMenuClose} size="small" sx={{ color: "#666" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <ListItem
                key={item.name}
                onClick={() => handleMobileNavigate(item.href)}
                sx={{
                  cursor: "pointer",
                  py: 1.5,
                  px: 2,
                  backgroundColor: isActive ? "rgba(0,0,0,0.04)" : "transparent",
                  borderLeft: isActive ? "3px solid #333" : "3px solid transparent",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#333" : "#666", minWidth: 40 }}>
                  <IconComponent sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ "& .MuiListItemText-primary": { color: isActive ? "#333" : "#666", fontWeight: isActive ? 600 : 400, fontSize: "15px" } }}
                />
              </ListItem>
            );
          })}

          {/* Role-specific menu */}
          {isAuthenticated && (role === "broker" || role === "volunteer") && (
            <ListItem
              onClick={() =>
                handleMobileNavigate(role === "broker" ? "/broker" : "/volunteer")
              }
              sx={{
                cursor: "pointer",
                py: 1.5,
                px: 2,
                backgroundColor: pathname === (role === "broker" ? "/broker" : "/volunteer") ? "rgba(0,0,0,0.04)" : "transparent",
                borderLeft: pathname === (role === "broker" ? "/broker" : "/volunteer") ? "3px solid #333" : "3px solid transparent",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
              }}
            >
              <ListItemIcon sx={{ color: "#666", minWidth: 40 }}>
                <DashboardIcon sx={{ fontSize: 22 }} />
              </ListItemIcon>
              <ListItemText
                primary={role === "broker" ? "จัดการสินค้า (Broker)" : "จัดการสินค้า (Volunteer)"}
                sx={{ "& .MuiListItemText-primary": { color: "#666", fontSize: "15px" } }}
              />
            </ListItem>
          )}
        </List>

        {/* Bottom Section */}
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ borderColor: "#e5e5e5" }} />

          {/* Theme Toggle */}
          <List>
            <ListItem onClick={handleThemeMenuOpen} sx={{ cursor: "pointer", py: 1.5, px: 2, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <ListItemIcon sx={{ color: "#666", minWidth: 40 }}>{themeIcon}</ListItemIcon>
              <ListItemText primary="Theme" sx={{ "& .MuiListItemText-primary": { color: "#666", fontSize: "15px" } }} />
            </ListItem>
          </List>

          {isAuthenticated && (
            <List>
              <ListItem onClick={handleSignOut} sx={{ cursor: "pointer", py: 1.5, px: 2, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                <ListItemIcon sx={{ color: "#666", minWidth: 40 }}>
                  <LogoutIcon sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText primary="Sign Out" sx={{ "& .MuiListItemText-primary": { color: "#666", fontSize: "15px" } }} />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ "& .MuiPaper-root": { backgroundColor: "#fff", border: "1px solid #e5e5e5", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", borderRadius: "8px", mt: 0.5 } }}
      >
        {isAuthenticated ? (
          <>
            <Box sx={{ p: 2, borderBottom: "1px solid #e5e5e5", minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#333" }}>{user?.name || "User"}</Typography>
              <Typography variant="body2" sx={{ color: "#666", fontSize: "13px" }}>{user?.email}</Typography>
            </Box>
            <MenuItem onClick={() => { handleUserMenuClose(); handleNavigate("/profile"); }} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <PersonIcon sx={{ mr: 2, fontSize: 20 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { handleUserMenuClose(); handleNavigate("/settings"); }} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <SettingsIcon sx={{ mr: 2, fontSize: 20 }} /> Settings
            </MenuItem>
            <Divider sx={{ borderColor: "#e5e5e5" }} />
            <MenuItem onClick={handleSignOut} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <LogoutIcon sx={{ mr: 2, fontSize: 20 }} /> Sign Out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => { handleUserMenuClose(); handleNavigate("/auth/login"); }} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => { handleUserMenuClose(); handleNavigate("/auth/sign-up"); }} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              Sign Up
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Theme Menu */}
      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        sx={{ "& .MuiPaper-root": { backgroundColor: "#fff", border: "1px solid #e5e5e5", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", borderRadius: "8px", mt: 0.5 } }}
      >
        <MenuItem onClick={() => handleThemeChange("light")} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
          <LightModeIcon sx={{ mr: 2, fontSize: 20 }} /> Light
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
          <DarkModeIcon sx={{ mr: 2, fontSize: 20 }} /> Dark
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("system")} sx={{ py: 1.5, px: 2, color: "#666", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
          <ComputerIcon sx={{ mr: 2, fontSize: 20 }} /> System
        </MenuItem>
      </Menu>
    </>
  );
}
