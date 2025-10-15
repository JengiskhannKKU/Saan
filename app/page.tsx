"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import { ArrowForwardIos, LocationOn } from "@mui/icons-material";
import Image from "next/image";
import ExpandableText from "@/components/ui/ExpandableText";

type ElderCard = {
  id: string;
  task_type: "โพสต์สินค้า" | "แพ็คของ";
  avatar_url: string | null;
  name: string;
  phone: string;
  location: string;
  product_name?: string | null;
  product_image?: string | null;
  product_price?: number | null;
  market_share?: number | null;
  product_descriptions?: string[] | null;
};

export default function HomePage() {
  const supabase = createClient();
  const [elders, setElders] = useState<ElderCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchElders = async () => {
      const { data, error } = await supabase
        .from("elder_cards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching elders:", error);
      else setElders(data as ElderCard[]);

      setIsLoading(false);
    };

    fetchElders();
  }, []);

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

        {/* Elderly List */}
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

          {isLoading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress color="success" />
            </Box>
          ) : elders.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" mt={2}>
              ยังไม่มีข้อมูลผู้สูงอายุ
            </Typography>
          ) : (
            elders.map((elder) => (
              <Card
                key={elder.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 1,
                  mb: 1.5,
                }}
              >
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    src={elder.avatar_url || "/placeholder-avatar.png"}
                    sx={{
                      width: 50,
                      height: 50,
                      border: "2px solid #16a34a",
                    }}
                  />

                  <Box flex={1}>
                    <Typography fontWeight={600}>{elder.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {elder.phone} • {elder.location}
                    </Typography>

                    {/* 🟢 Type: โพสต์สินค้า */}
                    {elder.task_type === "โพสต์สินค้า" && (
                      <Box mt={0.5}>
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
                          }}
                        >
                          โพสต์สินค้า
                        </Typography>
                        {elder.product_descriptions?.length ? (
                          <ExpandableText
                            text={elder.product_descriptions.join(" ")}
                            maxChars={150}
                          />
                        ) : null}
                      </Box>
                    )}

                    {/* 🟠 Type: แพ็คของ */}
                    {elder.task_type === "แพ็คของ" && (
                      <Box mt={1}>
                        {elder.product_image && (
                          <Image
                            src={elder.product_image}
                            alt={elder.product_name || "product"}
                            width={160}
                            height={160}
                            style={{
                              borderRadius: 10,
                              objectFit: "cover",
                              marginBottom: 6,
                            }}
                          />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: "#dcfce7",
                            color: "#16a34a",
                            px: 1,
                            py: 0.8,
                            borderRadius: 1,
                            fontWeight: 500,
                            display: "inline-block",
                          }}
                        >
                          แพ็คของ
                        </Typography>
                        {elder.product_name && (
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="text.primary"
                          >
                            {elder.product_name}
                          </Typography>
                        )}
                        {elder.product_descriptions?.length ? (
                          <ExpandableText
                            text={elder.product_descriptions.join(" ")}
                            maxChars={150}
                          />
                        ) : null}
                      </Box>
                    )}
                  </Box>
                  <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </AppLayout>
  );
}
