﻿import { Box, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect } from "react";
import MobileNav from "../components/Header/MobileNav";
import Navbar from "../components/Header/Navbar";
import Contacts from "../components/Main/Contacts";
import Feeds from "../components/Main/Feeds";
import Sidebar from "../components/Main/Sidebar";

type Props = {};

const Homepage = (props: Props) => {
	const tabletView = useMediaQuery("(max-width: 62em)");
	const moblieView = useMediaQuery("(max-width: 720px)");
	useEffect(() => {
		window.document.title = "Facebook - Home";
	}, []);
	return (
		<Flex
			w={"100%"}
			h="100vh"
			direction={"column"}
			bg="#F0F2F5"
			sx={{ overflow: "hidden" }}>
			<Box w={"100%"} sx={{ position: "sticky", zIndex: 100, top: "0" }}>
				<Navbar />
			</Box>
			<Box
				sx={{
					width: "100%",
					flexGrow: 1,
					display: "grid",
					paddingTop: "1rem",
					gridTemplateColumns: moblieView
						? "1fr"
						: tabletView
						? "1fr max-content"
						: "max-content 1fr max-content",
				}}>
				{/*---:: Sidebar ::---*/}

				{!tabletView && (
					<Box
						w={{
							lg: "14rem",
							xl: "20rem",
						}}
						sx={{
							height: "calc(100vh - 5rem)",
							overflowY: "scroll",
							"&::-webkit-scrollbar": { display: "none" },
						}}>
						<Sidebar />
					</Box>
				)}

				{/*---:: Posts - Story - Reel ::---*/}
				<Box
					sx={{
						height: "calc(100vh - 5rem)",
						overflow: "scroll",
						"&::-webkit-scrollbar": { display: "none" },
					}}>
					<Feeds />
				</Box>

				{/*---:: Contacts - Birthday - Groups ::---*/}
				{!moblieView && (
					<Box
						w={{
							lg: "18rem",
							xl: "20rem",
						}}
						sx={{
							height: "calc(100vh - 5rem)",
							overflow: "scroll",
							"&::-webkit-scrollbar": { display: "none" },
						}}>
						<Contacts />
					</Box>
				)}
			</Box>
		</Flex>
	);
};

export default Homepage;
