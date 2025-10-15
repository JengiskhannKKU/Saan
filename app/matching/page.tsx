"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router
import { AppLayout } from "@/components/layout/app-layout";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  InputBase,
  MenuItem,
  Select,
  CircularProgress,
  Paper,
} from "@mui/material";
import { FilterList, ArrowForwardIos, LocationOn, Search } from "@mui/icons-material";
import Image from "next/image";
import ExpandableText from "@/components/ui/ExpandableText";

type ElderCard = {
  id: string;
  task_type: "โพสต์สินค้า" | "แพ็คของ";
  avatar_url: string | null;
  name: string;
  phone: string;
  location: string;
  distance_km?: number | null;
  product_name?: string | null;
  product_image?: string | null;
  product_price?: number | null;
  product_descriptions?: string[] | null;
};

export default function MatchingPage() {
  const supabase = createClient();
  const router = useRouter(); // ✅ router for navigation

  const [elders, setElders] = useState<ElderCard[]>([]);
  const [filtered, setFiltered] = useState<ElderCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [taskFilter, setTaskFilter] = useState<"ทั้งหมด" | "โพสต์สินค้า" | "แพ็คของ">("ทั้งหมด");
  const [distanceFilter, setDistanceFilter] = useState<number | "ทั้งหมด">("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("elder_cards").select("*");
      if (error) console.error("Fetch error:", error);
      else {
        const dataWithDistance = data.map((e: any) => ({
          ...e,
          distance_km: e.distance_km || Math.random() * 80,
        }));
        setElders(dataWithDistance);
        setFiltered(dataWithDistance);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // ✅ Apply filters
  useEffect(() => {
    let result = [...elders];
    if (taskFilter !== "ทั้งหมด") {
      result = result.filter((e) => e.task_type === taskFilter);
    }
    if (distanceFilter !== "ทั้งหมด") {
      result = result.filter((e) => (e.distance_km ?? 0) <= distanceFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          (e.product_name?.toLowerCase().includes(q) ?? false)
      );
    }
    setFiltered(result);
  }, [taskFilter, distanceFilter, searchQuery, elders]);

  const handleTaskFilter = (_: any, newValue: any) => {
    if (newValue !== null) setTaskFilter(newValue);
  };

  // ✅ Function to navigate to task detail
  const handleCardClick = (id: string) => {
    router.push(`/matching/tasks/${id}`);
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            ผู้สูงอายุที่อยู่ใกล้คุณ
          </Typography>
          <IconButton>
            <FilterList sx={{ color: "#16a34a" }} />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 3,
            px: 2,
            py: 0.5,
            mb: 2,
            boxShadow: 1,
          }}
        >
          <Search sx={{ color: "#16a34a", mr: 1 }} />
          <InputBase
            placeholder="ค้นหาชื่อหรือสินค้า..."
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>

        {/* Filter Buttons */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <ToggleButtonGroup
            color="primary"
            value={taskFilter}
            exclusive
            onChange={handleTaskFilter}
            sx={{
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
            <ToggleButton value="แพ็คของ">แพ็คของ</ToggleButton>
          </ToggleButtonGroup>

          {/* Distance Filter */}
          <Select
            size="small"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value as any)}
            sx={{
              minWidth: 100,
              height: 36,
              ml: 1,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#16a34a" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#16a34a" },
              "& .MuiSelect-icon": { color: "#16a34a" },
            }}
          >
            <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
            <MenuItem value={20}>ภายใน 20 กม.</MenuItem>
            <MenuItem value={50}>ภายใน 50 กม.</MenuItem>
            <MenuItem value={80}>ภายใน 80 กม.</MenuItem>
          </Select>
        </Box>

        {/* Elder List */}
        {isLoading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress color="success" />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={4}>
            ไม่พบผู้สูงอายุที่ตรงกับเงื่อนไข
          </Typography>
        ) : (
          filtered.map((elder) => (
            <Card
              key={elder.id}
              onClick={() => handleCardClick(elder.id)} // ✅ click redirect
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
              <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  src={elder.avatar_url || "/placeholder-avatar.png"}
                  sx={{ width: 56, height: 56, border: "2px solid #16a34a" }}
                />
                <Box flex={1}>
                  <Typography fontWeight={600}>{elder.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {elder.phone}
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
                    {elder.task_type}
                  </Typography>

                  {/* Descriptions */}
                  {elder.task_type === "โพสต์สินค้า" &&
                    elder.product_descriptions?.map((desc, i) => (
                      <Typography key={i} variant="caption" display="block">
                        • {desc}
                      </Typography>
                    ))}

                  {elder.task_type === "แพ็คของ" && (
                    <Box mt={1}>
                      {elder.product_image && (
                        <Image
                          src={elder.product_image}
                          alt={elder.product_name || "product"}
                          width={70}
                          height={70}
                          style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                      )}
                      {elder.product_name && (
                        <Typography fontWeight={600} variant="body2">
                          {elder.product_name}
                        </Typography>
                      )}
                      {elder.product_price && (
                        <Typography variant="caption" color="text.secondary">
                          {elder.product_price} บาท
                        </Typography>
                      )}
                    </Box>
                  )}

                  {elder.product_descriptions?.length ? (
                    <ExpandableText text={elder.product_descriptions.join(" ")} maxChars={150} />
                  ) : null}

                  {elder.distance_km && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.3}
                      mt={0.5}
                    >
                      <LocationOn fontSize="inherit" color="success" />{" "}
                      {elder.distance_km.toFixed(1)} กม.
                    </Typography>
                  )}
                </Box>
                <ArrowForwardIos sx={{ fontSize: 16, color: "#9ca3af" }} />
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </AppLayout>
  );
}
