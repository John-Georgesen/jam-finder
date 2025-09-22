"use client";

import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
	const pathname = usePathname();
	const [value, setValue] = useState(0);

	// Sync active tab with route
	useEffect(() => {
		if (pathname === "/") setValue(0);
		else if (pathname.startsWith("/jam")) setValue(1);
		else if (pathname === "/profile") setValue(2);
		else setValue(-1);
	}, [pathname]);

	return (
		<AppBar position="static" sx={{backgroundColor: '#0a0a0a'}}>
			<Toolbar>
				<Tabs
					value={value}
					textColor="inherit"
					sx={{
						"& .MuiTabs-indicator": {
							backgroundColor: "white",
							transition: "none",
						},
					}}
					onChange={(e, newValue) => setValue(newValue)}
				>
					<Tab label="Home" component={Link} href="/" />
					<Tab label="Jams" component={Link} href="/jam" />
					<Tab label="Profile" component={Link} href="/profile" />
				</Tabs>
			</Toolbar>
		</AppBar>
	);
}