"use client";

import { Box, Typography } from "@mui/material";
import NavBar from "../../components/ui/nav_menu";

export default function ProfilePage() {
	return (
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
			}}
		>
			<Typography
				variant="h3"
				className="title"
				sx={{
					whiteSpace: "nowrap",
				}}
			>
				Jam On
			</Typography>

			<NavBar />
		</Box>
	);
}
