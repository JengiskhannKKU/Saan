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
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import { ArrowForwardIos, LocationOn } from "@mui/icons-material";
import Image from "next/image";

export default function TaskPage() {
  const supabase = createClient();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<"active" | "done">("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("volunteer_tasks")
        .select(`*, elder_cards(*)`)
        .order("created_at", { ascending: false });

      if (error) console.error("Fetch error:", error);
      else setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, [filter]);

  const filtered = tasks.filter((t) =>
    filter === "active" ? t.status === "active" : t.status === "done"
  );

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

        {/* Toggle buttons */}
        <Box display="flex" justifyContent="center" mb={2}>
          <ToggleButtonGroup
            color="success"
            exclusive
            value={filter}
            onChange={(_, v) => v && setFilter(v)}
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "20px",
                px: 3,
                py: 0.7,
                mx: 0.5,
                border: "1.5px solid #16a34a",
              },
              "& .Mui-selected": {
                bgcolor: "#16a34a !important",
                color: "white !important",
              },
            }}
          >
            <ToggleButton value="active">กำลังทำ</ToggleButton>
            <ToggleButton value="done">สำเร็จ</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Loading / Empty */}
        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress color="success" />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={3}>
            ยังไม่มีงานในหมวดนี้
          </Typography>
        ) : (
          filtered.map((t) => {
            const elder = t.elder_cards;
            return (
              <Card
                key={t.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 1,
                  mb: 2,
                  p: 0.5,
                  position: "relative",
                }}
              >
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  {/* Left: avatar or product */}
                  {elder.task_type === "โพสต์สินค้า" ? (
                    <Avatar
                      src={elder.avatar_url || "/placeholder-avatar.png"}
                      sx={{
                        width: 56,
                        height: 56,
                        border: "2px solid #16a34a",
                      }}
                    />
                  ) : (
                    elder.product_image && (
                      <Image
                        src={elder.product_image}
                        alt={elder.product_name || "product"}
                        width={90}
                        height={90}
                        style={{
                          borderRadius: 10,
                          objectFit: "cover",
                        }}
                      />
                    )
                  )}

                  {/* Middle */}
                  <Box flex={1}>
                    {elder.task_type === "โพสต์สินค้า" ? (
                      <>
                        <Typography fontWeight={600}>
                          {elder.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {elder.phone}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          gap={0.3}
                        >
                          <LocationOn
                            fontSize="inherit"
                            color="success"
                            sx={{ mr: 0.3 }}
                          />
                          {elder.location}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "inline-block",
                            bgcolor:
                              t.status === "active"
                                ? "#dcfce7"
                                : "#e0e7ff",
                            color:
                              t.status === "active"
                                ? "#16a34a"
                                : "#1e3a8a",
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            mt: 0.5,
                          }}
                        >
                          {t.status === "active"
                            ? "โพสต์สินค้า"
                            : "โพสต์เสร็จแล้ว"}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          fontWeight={600}
                          color="text.primary"
                          sx={{ fontSize: "0.95rem" }}
                        >
                          {elder.product_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          ฿{elder.product_price}/ชิ้น
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          gap={0.3}
                        >
                          <LocationOn
                            fontSize="inherit"
                            color="success"
                            sx={{ mr: 0.3 }}
                          />
                          {elder.location}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.8} mt={1}>
                          <Avatar
                            src={elder.avatar_url || "/placeholder-avatar.png"}
                            sx={{ width: 26, height: 26 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {elder.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "inline-block",
                            bgcolor:
                              t.status === "active"
                                ? "#dcfce7"
                                : "#e0e7ff",
                            color:
                              t.status === "active"
                                ? "#16a34a"
                                : "#1e3a8a",
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            mt: 0.5,
                          }}
                        >
                          แพ็คสินค้า
                        </Typography>
                      </>
                    )}
                  </Box>

                  {/* Arrow */}
                  <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </AppLayout>
  );
}
