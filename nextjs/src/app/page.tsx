"use client";

import { Box, Typography } from "@mui/material";
import NavBar from "../components/ui/nav_menu";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",       // horizontal layout
        alignItems: "center",       // vertically center items
        justifyContent: "flex-start",
        width: "100%",
        p: 3,
        gap: 4,                     // space between title and nav
        flexWrap: "nowrap",          // prevent wrapping
        position: "sticky",          // keeps it at the top on scroll
        top: 0,
        backgroundColor: "transparent", // or use a color
      }}
    >
      <Typography
        variant="h3"
        className="title"
        sx={{
          whiteSpace: "nowrap",      // prevent wrapping
        }}
      >
        Jam On
      </Typography>

      <NavBar />
    </Box>
  );
}
