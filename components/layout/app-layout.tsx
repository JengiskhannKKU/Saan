"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Avatar, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { Navbar } from "@/components/navigation/navbar";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectSidebarOpen } from "@/lib/redux/selectors";
import { useRouter, usePathname } from "next/navigation";
import { Home, ClipboardList, User } from "lucide-react";
import { LocationOn } from "@mui/icons-material";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "หน้าหลัก", icon: <Home size={22} />, path: "/" },
    { label: "จับคู่ผู้สูงอายุ", icon: <LocationOn />, path: "/matching" },
    { label: "งานของฉัน", icon: <ClipboardList size={22} />, path: "/tasks" },
    { label: "ฉัน", icon: <User size={22} />, path: "/profile" },
  ];

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

      {/* Bottom Navigation */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "white",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-around",
            py: 1,
            zIndex: 1000,
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.path}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  opacity: isActive ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  onClick={() => router.push(item.path)}
                  sx={{
                    flexDirection: "column",
                    color: isActive ? "#16a34a" : "#6b7280",
                    minWidth: "64px",
                    textTransform: "none",
                    fontSize: "0.7rem",
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </motion.div>
            );
          })}
        </Box>
      )}
    </div>
  );
}
