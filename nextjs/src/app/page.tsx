"use client";

import { Box, Typography } from "@mui/material";
import NavBar from "../components/ui/nav_menu";
import Map from "../components/map/map";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top header: title + nav */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          p: 3,
          gap: 4,
          flexWrap: "nowrap",
          position: "sticky",
          top: 0,
          backgroundColor: "transparent",
          zIndex: 10, // ensure header stays above map
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          className="title"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          Jam On
        </Typography>

        {/* NavBar */}
        <NavBar />
      </Box>

      {/* Map Section */}
      <Box sx={{ flex: 1, width: "100%", p: 3 }}>
		<Typography
			variant="h6"
			sx={{
				mb: 3,
				fontFamily: '"Raleway", sans-serif',
				fontWeight: 200,
				lineHeight: 1.3,
			}}
			>
			Find Jam Sessions Near You
			</Typography>
        <Map />
      </Box>
    </Box>
  );
}
