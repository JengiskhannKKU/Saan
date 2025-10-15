"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function TasksPage() {
  const supabase = createClient();
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<"active" | "done">("active");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch volunteer tasks with elder details
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("volunteer_tasks")
        // 👇 Explicit join using correct foreign key (elder_id)
        .select(
          `
          id,
          status,
          created_at,
          selected_tasks,
          elder_cards:elder_id (
            id,
            name,
            phone,
            location,
            avatar_url,
            task_type,
            product_name,
            product_image,
            product_price
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setTasks(data || []);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [supabase]);

  // ✅ Filter by active/done
  const filtered = tasks.filter((t) =>
    filter === "active" ? t.status === "active" : t.status === "done"
  );

  // ✅ Navigate to detail page based on task type
  const handleCardClick = (task: any) => {
    if (!task.elder_cards) return;
    if (task.elder_cards.task_type === "โพสต์สินค้า") {
      router.push(`/tasks/post/${task.id}`);
    } else {
      router.push(`/tasks/pack/${task.id}`);
    }
  };

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
        <Typography
          variant="h6"
          fontWeight={700}
          textAlign="center"
          mb={2}
          sx={{ color: "#1b4332" }}
        >
          งานของฉัน
        </Typography>

        {/* Toggle Filter */}
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

        {/* Loading */}
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
            if (!elder) return null;

            return (
              <Card
                key={t.id}
                onClick={() => handleCardClick(t)}
                sx={{
                  borderRadius: 3,
                  boxShadow: 1,
                  mb: 2,
                  cursor: "pointer",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  {/* Left image/avatar */}
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

                  {/* Middle Info */}
                  <Box flex={1}>
                    {elder.task_type === "โพสต์สินค้า" ? (
                      <>
                        <Typography fontWeight={600}>{elder.name}</Typography>
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
                            bgcolor: "#dcfce7",
                            color: "#16a34a",
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            mt: 0.5,
                          }}
                        >
                          โพสต์สินค้า
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography fontWeight={600}>
                          {elder.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                      </>
                    )}
                  </Box>

                  {/* Right arrow */}
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
