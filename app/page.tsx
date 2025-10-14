"use client";

import { AppLayout } from "@/components/layout/app-layout";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowForwardIos, LocationOn } from "@mui/icons-material";
import Image from "next/image";

export default function HomePage() {
  return (
    <AppLayout>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          bgcolor: "#f9fafb",
          py: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Greeting Card */}
        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src="/profile.jpg"
                sx={{
                  width: 56,
                  height: 56,
                  border: "2px solid #16a34a",
                }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  สวัสดี{" "}
                  <Box component="span" sx={{ color: "#16a34a" }}>
                    คุณปีเตอร์ พาร์เกอร์
                  </Box>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  เหลืออีก <strong>2 วัน</strong> ก่อนถึงวันสิ้นเดือน
                </Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={30}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  bgcolor: "#e5e7eb",
                  "& .MuiLinearProgress-bar": { bgcolor: "#16a34a" },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={0.5}
              >
                1/3 สินค้า
              </Typography>
            </Box>

            {/* ✅ Grid Fixed & Responsive */}
            <Grid container spacing={2} sx={{ mt: 1 , display: "flex", justifyContent: "center"}}>
              <Grid size={6} >
                <Card
                  sx={{
                    bgcolor: "#f0fdf4",
                    borderRadius: 3,
                    textAlign: "center",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    รายได้วันนี้
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#16a34a", fontWeight: "bold" }}
                  >
                    240 บาท
                  </Typography>
                </Card>
              </Grid>

              <Grid size={6} >
                <Card
                  sx={{
                    bgcolor: "#f0fdf4",
                    borderRadius: 3,
                    textAlign: "center",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    ออเดอร์วันนี้
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#16a34a", fontWeight: "bold" }}
                  >
                    20 ออเดอร์
                  </Typography>
                </Card>
              </Grid>

            </Grid>
          </CardContent>
        </Card>

        {/* Banner */}
        <Card
          sx={{
            background: "linear-gradient(to right, #22c55e, #16a34a)",
            borderRadius: 4,
            color: "white",
            overflow: "hidden",
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h6" fontWeight="700" mb={1}>
              ทุกการช่วยเหลือของคุณ {"ปีเตอร์ พาร์เกอร์"}
              <br />
              คือพลังสนับสนุนการใช้ผู้สูงอายุ
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#f472b6",
                  borderRadius: "50%",
                }}
              />
              <Typography variant="caption">
                1 การช่วยเหลือ = การสร้างความมั่นคงให้กับผู้สูงอายุ
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              opacity: 0.15,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                border: "2px solid white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "white",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Box>
        </Card>

        {/* Products You Manage */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography fontWeight="600" variant="subtitle1">
              สินค้าที่คุณดูแลอยู่
            </Typography>
            <IconButton size="small">
              <ArrowForwardIos sx={{ fontSize: 16, color: "#16a34a" }} />
            </IconButton>
          </Box>

          <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Image
                src="/product.jpg"
                alt="product"
                width={70}
                height={70}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
              <Box flex={1}>
                <Typography fontWeight="600">กระติ๊บข้าว</Typography>
                <Typography variant="caption" color="text.secondary">
                  812 บาท/ชิ้น
                </Typography>
                <Box mt={0.5} display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#16a34a",
                      px: 1,
                      borderRadius: 1,
                      fontWeight: 500,
                    }}
                  >
                    พร้อมส่ง
                  </Typography>
                </Box>
              </Box>
              <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
            </CardContent>
          </Card>
        </Box>

        {/* Elderly Near You */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography fontWeight="600" variant="subtitle1">
              ผู้สูงอายุที่อยู่ใกล้คุณ
            </Typography>
            <IconButton size="small">
              <ArrowForwardIos sx={{ fontSize: 16, color: "#16a34a" }} />
            </IconButton>
          </Box>

          {[
            {
              name: "คุณบุญมี สิมารักษ์ จิตตา",
              distance: "750 ม.",
              works: ["ผลงานหัตถกรรมไม้ไผ่ทำแปรง", "พวงกุญแจและไม้ลุงกลึง"],
              avatar: "/elder1.jpg",
            },
            {
              name: "พวงกุญแจของชาวสานชลธี",
              distance: "2 กม.",
              works: ["งานปักผ้าไหมและงานฝีมือ"],
              avatar: "/elder2.jpg",
            },
          ].map((elder, i) => (
            <Card key={i} sx={{ borderRadius: 3, boxShadow: 1, mb: 1.5 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar
                  src={elder.avatar}
                  sx={{
                    width: 50,
                    height: 50,
                    border: "2px solid #16a34a",
                  }}
                />
                <Box flex={1}>
                  <Typography fontWeight="600">{elder.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    <LocationOn fontSize="inherit" color="success" />{" "}
                    {elder.distance}
                  </Typography>
                  {elder.works.map((w, idx) => (
                    <Typography key={idx} variant="caption" display="block">
                      • {w}
                    </Typography>
                  ))}
                </Box>
                <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </AppLayout>
  );
}
