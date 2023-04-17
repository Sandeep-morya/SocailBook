﻿import { Avatar, Flex, Input, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useCallback, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { ImImages } from "react-icons/im";
import { IoTextSharp } from "react-icons/io5";
import {
	MdAddCircle,
	MdOutlineWavingHand,
	MdStickyNote2,
} from "react-icons/md";
import useSearchUser from "../../hooks/useSearchUser";
import { useUserProfile } from "../../Provider/UserContextProvider";
import { MessageType, UserProfileType } from "../../types";
import AvatarButton from "../Common/AvatarButton";
import Button from "../Misc/BubbleButton";
import Chats from "./Chats";

type Props = {
	recipient: UserProfileType;
};

function ChatScreen({ recipient }: Props) {
	const theme = useMantineTheme();
	const { ref, hovered } = useHover();

	// ::  ::
	const { userdata: sender } = useUserProfile();
	const [chats, setChats] = useState<MessageType[]>([]);
	const [message, setMessage] = useState("");

	const handleMessageSend = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && message != "") {
				const chat = {
					room: "",
					message,
					sender: sender!._id,
					recipient: recipient._id,
					time: Date.now(),
				};
				setChats((e) => [...e, chat]);
				setMessage("");
			}
		},
		[message, sender],
	);

	if (!sender) {
		return <></>;
	}

	return (
		<Flex
			direction={"column"}
			sx={{
				borderTop: "0.1rem solid rgba(0,0,0,0.1)",
				// borderBottom: "0.1rem solid rgba(0,0,0,0.1)",
			}}>
			{/*---:: Chats ::---*/}
			<Flex justify={"center"} w="100%" align="end" h="60vh">
				{
					/* recipient.chats.length < 1 */ false && (
						<Flex ref={ref} direction={"column"} align="center" gap={"md"}>
							<Avatar
								size={"xl"}
								radius={"xl"}
								src={recipient.image}
								alt={recipient.name}
							/>
							<Text>{recipient.name}</Text>
							<Button
								colorScheme={theme.colors.blue[5]}
								size="md"
								style={{
									boxShadow: "none",
									background: hovered ? theme.colors.blue[5] : "none",
									color: hovered ? "white" : theme.colors.gray[5],
								}}>
								Send a Hi <MdOutlineWavingHand />
							</Button>
						</Flex>
					)
				}

				{
					/* recipient.chats.length < 0 */ true && (
						<Chats {...{ chats, sender, recipient }} />
					)
				}
			</Flex>
			{/*---:: Send Bar ::---*/}
			<Flex
				w="100%"
				maw="100%"
				align={"center"}
				gap="1rem"
				justify="space-between"
				sx={{ overflow: "hidden" }}>
				<MdAddCircle color={theme.colors.gray[5]} size={25} />
				<ImImages size={25} color={theme.colors.gray[5]} />
				<MdStickyNote2 size={25} color={theme.colors.gray[5]} />
				<HiGif size={25} color={theme.colors.gray[5]} />
				<Input
					radius={"xl"}
					variant="filled"
					size={"md"}
					c="blue"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleMessageSend}
					icon={<IoTextSharp size={25} color={theme.colors.gray[5]} />}
					rightSection={<FaSmile size={25} color={theme.colors.gray[5]} />}
				/>
				<Button
					colorScheme={theme.colors.blue[5]}
					style={{
						padding: 0,
						background: "none",
						boxShadow: "none",
					}}>
					<BiLike size={25} color={theme.colors.gray[5]} />
				</Button>
			</Flex>
		</Flex>
	);
}

export default ChatScreen;