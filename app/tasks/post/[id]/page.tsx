"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  FormControlLabel,
  Switch,
  CircularProgress,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Grid } from "@mui/material";
import {
  ShoppingCart,
  Sparkles,
  ReceiptText,
  Boxes,
  Layers,
  Truck,
  Plus,
  ListOrdered,
  ArrowLeft,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ProductFormData {
  images: string[];
  nameThai: string;
  nameEnglish: string;
  description: string;
  category: string;
  gtin: string;
  price: string;
  stock: string;
  minQuantity: string;
  maxQuantity: string;
  wholesalePrice: string;
  weight: string;
  width: string;
  length: string;
  height: string;
  readyForOrder: boolean;
  schedulePublish: boolean;
}

export default function PostProductPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  const [formData, setFormData] = useState<ProductFormData>({
    images: [],
    nameThai: "",
    nameEnglish: "",
    description: "",
    category: "กระติ๊บข้าวเหนียว",
    gtin: "",
    price: "",
    stock: "",
    minQuantity: "",
    maxQuantity: "",
    wholesalePrice: "",
    weight: "",
    width: "",
    length: "",
    height: "",
    readyForOrder: true,
    schedulePublish: false,
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 9 - imagePreview.length);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...newPreviews]);
    }
  };

  const handleSubmit = () => {
    if (!formData.nameThai || !formData.nameEnglish || !formData.description) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    console.log("Submitting:", formData);
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  // Optional: fetch elder info if linked
  useEffect(() => {
    // You can fetch elder info for display if needed
  }, [params.id]);

  return (
    <AppLayout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 6 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <IconButton onClick={() => router.back()}>
            <ArrowLeft />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            เพิ่มสินค้า
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        <Box sx={{ maxWidth: 480, mx: "auto", px: 2, py: 3 }}>
          {/* Product Images */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            รูปภาพสินค้า <span style={{ color: "red" }}>*</span>
          </Typography>
          <Grid container spacing={1.5} mb={2}>
            {imagePreview.map((img, idx) => (
              <Grid size={4} key={idx}>
                <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <Image
                    src={img}
                    alt={`Product ${idx}`}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
            {imagePreview.length < 9 && (
              <Grid size={4}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: "2px dashed #ccc",
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-img"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="upload-img">
                    <Plus style={{ color: "#888" }} />
                  </label>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* Name (TH) */}
          <TextField
            fullWidth
            label="ชื่อสินค้า (ไทย)"
            variant="outlined"
            value={formData.nameThai}
            onChange={(e) =>
              setFormData({ ...formData, nameThai: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShoppingCart size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Name (EN) */}
          <TextField
            fullWidth
            label="ชื่อสินค้า (อังกฤษ)"
            variant="outlined"
            value={formData.nameEnglish}
            onChange={(e) =>
              setFormData({ ...formData, nameEnglish: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Sparkles size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Description */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="รายละเอียดสินค้า"
            variant="outlined"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value.slice(0, 5000),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReceiptText size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Category */}
          <TextField
            select
            label="หมวดหมู่สินค้า"
            fullWidth
            SelectProps={{ native: true }}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            sx={{ mb: 3 }}
          >
            {[
              "กระติ๊บข้าวเหนียว",
              "ตะกร้าจักสาน",
              "กระเป๋าสาน",
              "กล่องของขวัญจักสาน",
              "ของตกแต่งไม้",
              "เครื่องครัวไม้",
              "ผ้าทอมือ",
              "กระเป๋าผ้า",
              "สบู่สมุนไพร",
              "เทียนหอม",
              "ของที่ระลึก",
              "โคมไฟตกแต่ง",
              "เครื่องประดับทำมือ",
              "เครื่องปั้นดินเผา",
              "ภาพวาด",
              "งานถักไหมพรม",
              "ผลิตภัณฑ์จากกะลามะพร้าว",
              "ผลิตภัณฑ์จากผักตบชวา",
              "ของใช้รักษ์โลก",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </TextField>

          {/* GTIN */}
          <TextField
            fullWidth
            label="GTIN"
            variant="outlined"
            value={formData.gtin}
            onChange={(e) => setFormData({ ...formData, gtin: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ListOrdered size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Price */}
          <TextField
            fullWidth
            label="ราคา (บาท)"
            type="number"
            variant="outlined"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          {/* Stock */}
          <TextField
            fullWidth
            label="จำนวนสินค้าในคลัง"
            type="number"
            variant="outlined"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Boxes size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Min Order */}
          <TextField
            fullWidth
            label="จำนวนการซื้อขั้นต่ำ"
            type="number"
            variant="outlined"
            value={formData.minQuantity}
            onChange={(e) =>
              setFormData({ ...formData, minQuantity: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Layers size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Wholesale Section */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography fontWeight={600} mb={1}>
                ขายส่ง
              </Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    label="ขั้นต่ำ"
                    type="number"
                    fullWidth
                    value={formData.minQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, minQuantity: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="สูงสุด"
                    type="number"
                    fullWidth
                    value={formData.maxQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, maxQuantity: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <TextField
                label="ราคาขายส่ง (฿)"
                type="number"
                fullWidth
                sx={{ mt: 2 }}
                value={formData.wholesalePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wholesalePrice: e.target.value,
                  })
                }
              />
            </CardContent>
          </Card>

          {/* Shipping */}
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            ขนาด / น้ำหนักสินค้า
          </Typography>
          <Grid container spacing={1.5} mb={3}>
            <Grid size={4}>
              <TextField
                label="กว้าง (cm)"
                type="number"
                value={formData.width}
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={4}>
              <TextField
                label="ยาว (cm)"
                type="number"
                value={formData.length}
                onChange={(e) =>
                  setFormData({ ...formData, length: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={4}>
              <TextField
                label="สูง (cm)"
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <TextField
            label="น้ำหนักสินค้า (g)"
            type="number"
            fullWidth
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Truck size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Toggles */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.readyForOrder}
                onChange={() =>
                  setFormData({
                    ...formData,
                    readyForOrder: !formData.readyForOrder,
                  })
                }
                color="success"
              />
            }
            label="สินค้าพรีออเดอร์"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.schedulePublish}
                onChange={() =>
                  setFormData({
                    ...formData,
                    schedulePublish: !formData.schedulePublish,
                  })
                }
                color="success"
              />
            }
            label="เวลาเผยแพร่สินค้า"
          />

          {/* Submit */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
            }}
            onClick={handleSubmit}
          >
            บันทึก
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
}
