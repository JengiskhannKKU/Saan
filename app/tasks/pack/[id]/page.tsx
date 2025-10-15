"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";

export default function PackTaskDetailPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusTab, setStatusTab] = useState("รอจัดส่ง");

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from("volunteer_tasks")
        .select(
          `
          id,
          status,
          created_at,
          elder_cards:elder_id (
            id,
            name,
            phone,
            avatar_url,
            product_name,
            product_image,
            product_price,
            location,
            product_descriptions
          )
        `
        )
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setTask(data);
      }
      setLoading(false);
    };
    fetchTask();
  }, [params.id, supabase]);

  if (loading)
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress color="success" />
      </Box>
    );

  if (!task || !task.elder_cards)
    return (
      <Box className="p-6 text-center">
        <Typography color="text.secondary">ไม่พบข้อมูล</Typography>
      </Box>
    );

  const elder = task.elder_cards;

  return (
    <AppLayout>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Button onClick={() => router.back()}>
            <ArrowBack />
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "none",
              px: 2,
              py: 0.5,
              borderRadius: "8px",
            }}
          >
            แก้ไข
          </Button>
        </Box>

        {/* Product Section */}
        <Box sx={{ p: 2 }}>
          {elder.product_image && (
            <Image
              src={elder.product_image}
              alt={elder.product_name || "product"}
              width={600}
              height={400}
              className="rounded-xl"
            />
          )}

          <Typography variant="h6" fontWeight={700} mt={2}>
            {elder.product_name}
          </Typography>
        </Box>

        {/* Elder Info */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar src={elder.avatar_url} sx={{ width: 40, height: 40 }} />
            <Typography fontWeight={600}>{elder.name}</Typography>
          </Box>
        </Box>

        {/* Tabs: รอจัดส่ง | จัดส่งแล้ว | สำเร็จ */}
        <Box textAlign="center" mb={1}>
          <ToggleButtonGroup
            color="success"
            value={statusTab}
            exclusive
            onChange={(_, v) => v && setStatusTab(v)}
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                border: "1.5px solid #16a34a",
                borderRadius: "8px",
                mx: 0.5,
                px: 2.5,
              },
              "& .Mui-selected": {
                bgcolor: "#16a34a !important",
                color: "white !important",
              },
            }}
          >
            <ToggleButton value="รอจัดส่ง">รอจัดส่ง</ToggleButton>
            <ToggleButton value="จัดส่งแล้ว">จัดส่งแล้ว</ToggleButton>
            <ToggleButton value="สำเร็จ">สำเร็จ</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Delivery info card */}
        <Box sx={{ p: 2 }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              backgroundColor: "#f9fafb",
            }}
          >
            <CardContent>
              <Typography variant="body2" fontWeight={600}>
                ปริญ มั่นยืนดี
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 ม.5 บ้านฝั่งแดง ต.ในเมือง จ.ขอนแก่น 40002
              </Typography>
              <Typography variant="body2" mt={1}>
                2 โหล
              </Typography>
              <Typography variant="body2">8139</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AppLayout>
  );
}
