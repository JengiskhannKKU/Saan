"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";
import ExpandableText from "@/components/ui/ExpandableText";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [elder, setElder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    const fetchElder = async () => {
      const { data, error } = await supabase
        .from("elder_cards")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) console.error("Fetch error:", error);
      else setElder(data);
      setLoading(false);
    };
    fetchElder();
  }, [params.id, supabase]);

  if (loading)
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress color="success" />
      </Box>
    );

  if (!elder)
    return (
      <Box className="p-4 text-center">
        <Typography>ไม่พบข้อมูล</Typography>
      </Box>
    );

  const formatDistance = (d: number) =>
    d >= 1 ? `${d.toFixed(1)} กม.` : `${(d * 1000).toFixed(0)} ม.`;

  // ✅ For toggling task selection
  const handleToggleTask = (task: string) => {
    if (elder.task_type === "โพสต์สินค้า") {
      // multiple selectable
      setSelectedTasks((prev) =>
        prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
      );
    } else {
      // single select for แพ็คของ
      setSelectedTasks((prev) => (prev[0] === task ? [] : [task]));
    }
  };

  const isSelected = (task: string) => selectedTasks.includes(task);

  return (
    <AppLayout>
      <Box className="min-h-screen bg-white">
        {/* Header */}
        <Box className="flex items-center p-4 border-b border-gray-200">
          <Button onClick={() => router.back()}>
            <ArrowBack />
          </Button>
          <Typography variant="h6" className="flex-1 text-center font-semibold">
            {elder.task_type === "โพสต์สินค้า"? elder.name : elder.product_name}
          </Typography>
        </Box>

        {elder.task_type === "โพสต์สินค้า" ? (
          // 🟢 Volunteer_post_product layout
          <Box className="p-4 space-y-4">
            {/* Elder Info */}
            <Box className="flex items-center space-x-3">
              <Avatar src={elder.avatar_url} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography fontWeight="bold">{elder.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {elder.phone}
                </Typography>
                {elder.distance_km && (
                  <Typography variant="body2" color="text.secondary">
                    {formatDistance(elder.distance_km)}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Product Section */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  สินค้า
                </Typography>
                {elder.product_descriptions?.map((desc: string, i: number) => (
                  <Typography key={i} variant="body2" color="text.secondary">
                    • {desc}
                  </Typography>
                ))}

                <Box className="mt-4 flex flex-col space-y-2">
                  {/* Selectable buttons */}
                  <Button
                    variant={isSelected("โพสต์สินค้า") ? "contained" : "outlined"}
                    color="success"
                    fullWidth
                    onClick={() => handleToggleTask("โพสต์สินค้า")}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 600,
                      borderWidth: 2,
                      textTransform: "none",
                    }}
                  >
                    โพสต์สินค้า
                  </Button>
                  <Button
                    variant={isSelected("เพิ่มสินค้า") ? "contained" : "outlined"}
                    color="success"
                    fullWidth
                    onClick={() => handleToggleTask("เพิ่มสินค้า")}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 600,
                      borderWidth: 2,
                      textTransform: "none",
                    }}
                  >
                    เพิ่มสินค้า
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Add task button */}
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                py: 1.4,
                fontWeight: 600,
                borderRadius: "12px",
              }}
            >
              เพิ่ม task
            </Button>
          </Box>
        ) : (
          // 🟣 Volunteer_pack_product layout
          <Box className="p-4 space-y-4">
            {elder.product_image && (
              <Image
                src={elder.product_image}
                alt={elder.product_name || "product"}
                width={600}
                height={400}
                className="rounded-xl"
              />
            )}

            {/* Product title + price */}
            <Typography variant="h6" fontWeight="bold">
              {elder.product_name}
            </Typography>
            {elder.product_price && (
              <Typography variant="subtitle2" color="text.secondary">
                ส่วนแบ่ง {elder.product_price.toFixed(2)} บาท/ชิ้น
              </Typography>
            )}

            {/* Expandable description */}
            {elder.product_descriptions?.length && (
              <ExpandableText
                text={elder.product_descriptions.join(" ")}
                maxChars={180}
              />
            )}

            {/* Elder Info */}
            <Card variant="outlined" className="mt-4">
              <CardContent className="flex items-center space-x-3">
                <Avatar src={elder.avatar_url} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography fontWeight="bold">{elder.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elder.phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Single-select task */}
            <Box className="mt-2">
              <Button
                variant={isSelected("แพ็คสินค้า") ? "contained" : "outlined"}
                color="success"
                fullWidth
                onClick={() => handleToggleTask("แพ็คสินค้า")}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 600,
                  borderWidth: 2,
                  textTransform: "none",
                }}
              >
                แพ็คสินค้า
              </Button>

              <Button
                variant="contained"
                color="success"
                fullWidth
                className="mt-3"
                sx={{
                    mt: 4,
                    py: 1.4,
                    fontWeight: 600,
                    borderRadius: "12px",
                }}
              >
                เพิ่ม task
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}
