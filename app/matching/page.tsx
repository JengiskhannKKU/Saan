"use client";

import { AppLayout } from "@/components/layout/app-layout";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { FilterList, ArrowForwardIos, LocationOn } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

export default function ElderlyPage() {
  const [filter, setFilter] = useState("ทั้งหมด");

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  const elders = [
    {
      name: "คุณบุญสม ศิริมิตร จิตตา",
      phone: "0912345678",
      distance: "750 ม.",
      type: "โพสต์สินค้า",
      avatar: "/elder1.jpg",
      products: [
        "ผลงานหัตถกรรมไม้ไผ่ทำแปรง",
        "พวงกุญแจและไม้ลุงกลึง",
      ],
    },
    {
      name: "คุณดอกลาย บานะ",
      phone: "0912345679",
      distance: "1.2 กม.",
      type: "เพิ่มสินค้า",
      avatar: "/elder2.jpg",
      products: ["ตะกร้าผ้ารักษ์โลก"],
    },
  ];

  const products = [
    {
      name: "พวงกุญแจของชาวสานชลธี",
      price: "฿15/ชิ้น",
      status: "พร้อมส่ง",
      owner: "คุณสมจิตร",
      distance: "2 กม.",
      images: ["/product1.jpg", "/profile.jpg"],
    },
    {
      name: "พวงกุญแจของชาวสานชลธี",
      price: "฿20/ชิ้น",
      status: "พร้อมส่ง",
      owner: "คุณบุญศรี",
      distance: "2 กม.",
      images: ["/product2.jpg", "/elder2.jpg"],
    },
  ];

  return (
    <AppLayout>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f9fafb",
          py: 3,
          px: { xs: 2, sm: 3 },
          maxWidth: 480,
          mx: "auto",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            ผู้สูงอายุที่อยู่ใกล้คุณ
          </Typography>
          <IconButton>
            <FilterList sx={{ color: "#16a34a" }} />
          </IconButton>
        </Box>

        {/* Filter Buttons */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={handleFilterChange}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "20px",
                px: 2.5,
                py: 0.7,
                border: "1px solid #16a34a",
                color: "#16a34a",
                "&.Mui-selected": {
                  bgcolor: "#16a34a",
                  color: "#fff",
                },
              },
            }}
          >
            <ToggleButton value="ทั้งหมด">ทั้งหมด</ToggleButton>
            <ToggleButton value="โพสต์สินค้า">โพสต์สินค้า</ToggleButton>
            <ToggleButton value="เพิ่มสินค้า">เพิ่มสินค้า</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Elderly List */}
        <Box mt={3}>
          {elders
            .filter((e) => filter === "ทั้งหมด" || e.type === filter)
            .map((elder, i) => (
              <Card
                key={i}
                sx={{
                  borderRadius: 3,
                  boxShadow: 1,
                  mb: 2,
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Avatar
                    src={elder.avatar}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "2px solid #16a34a",
                    }}
                  />
                  <Box flex={1}>
                    <Typography fontWeight={600}>{elder.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {elder.phone} | {elder.distance}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "inline-block",
                        bgcolor: "#dcfce7",
                        color: "#16a34a",
                        px: 1,
                        py: 0.2,
                        borderRadius: 1,
                        ml: 1,
                        fontWeight: 500,
                      }}
                    >
                      {elder.type}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      fontWeight={500}
                    >
                      สินค้า
                    </Typography>
                    {elder.products.map((p, idx) => (
                      <Typography key={idx} variant="caption" display="block">
                        • {p}
                      </Typography>
                    ))}
                  </Box>
                  <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
                </CardContent>
              </Card>
            ))}
        </Box>

        {/* Product Cards */}
        <Box mt={2}>
          {products.map((prod, idx) => (
            <Card
              key={idx}
              sx={{
                borderRadius: 3,
                boxShadow: 1,
                mb: 2,
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Image
                  src={prod.images[0]}
                  alt={prod.name}
                  width={80}
                  height={80}
                  style={{ borderRadius: 10, objectFit: "cover" }}
                />
                <Box flex={1}>
                  <Typography fontWeight={600}>{prod.name}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {prod.price}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#16a34a",
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      fontWeight: 500,
                      display: "inline-block",
                      mt: 0.3,
                    }}
                  >
                    {prod.status}
                  </Typography>

                  <Box mt={0.5} display="flex" alignItems="center" gap={1}>
                    {prod.images.map((img, i) => (
                      <Avatar
                        key={i}
                        src={img}
                        sx={{ width: 24, height: 24, border: "2px solid white" }}
                      />
                    ))}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.3}
                    >
                      <LocationOn fontSize="inherit" color="success" />{" "}
                      {prod.distance}
                    </Typography>
                  </Box>
                </Box>
                <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </AppLayout>
  );
}
