"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Avatar, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { Navbar } from "@/components/navigation/navbar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectSidebarOpen } from "@/lib/redux/selectors";
import { LocationOn } from "@mui/icons-material";
import { ShoppingBag } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sidebarOpen = useAppSelector(selectSidebarOpen);

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
        }}
      >
        {[
          { label: "หน้าหลัก", icon: <ShoppingBag/> },
          { label: "จับคู่ผู้สูงอายุ", icon: <LocationOn/> },
          { label: "task", icon: <ShoppingBag/> },
          { label: "ฉัน", icon: <Avatar sx={{ width: 24, height: 24 }} /> },
        ].map((item, i) => (
          <Button
            key={i}
            sx={{
              flexDirection: "column",
              color: i === 0 ? "#16a34a" : "#6b7280",
              minWidth: "64px",
              textTransform: "none",
              fontSize: "0.7rem",
            }}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </Box>
    </div>
  );
}
