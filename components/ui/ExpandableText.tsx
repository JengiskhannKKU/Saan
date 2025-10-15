"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ExpandableTextProps {
  text: string;
  maxChars?: number; // default 120
}

export default function ExpandableText({ text, maxChars = 120 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxChars;
  const displayText = expanded ? text : text.slice(0, maxChars) + (isLong ? "..." : "");

  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.6,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          maskImage: !expanded && isLong ? "linear-gradient(180deg, black 60%, transparent)" : "none",
        }}
      >
        {displayText}
      </Typography>

      {isLong && (
        <Box textAlign="center" mt={0.5}>
          <Button
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              color: "#16a34a",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mx: "auto",
            }}
          >
            {expanded ? (
              <>
                ซ่อนข้อความ <ExpandLessIcon sx={{ fontSize: 18 }} />
              </>
            ) : (
              <>
                แสดงเพิ่มเติม <ExpandMoreIcon sx={{ fontSize: 18 }} />
              </>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
