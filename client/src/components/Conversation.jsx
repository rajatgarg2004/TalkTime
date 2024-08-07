import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, useColorMode, useColorModeValue, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs';
import { selectedConversationAtom } from '../atoms/messagesAtom';

const Conversation = ({ conversation }) => {
    const user = conversation.participants[0];
    const lastMessage = conversation.lastMessage;
    const currUser = useRecoilValue(userAtom);
    const [currConversation, setCurrConversation] = useRecoilState(selectedConversationAtom);
    const { colorMode } = useColorMode();

    const handleClick = () => {
        setCurrConversation({
            _id: conversation._id,
            userId: user._id,
            username: user.username,
            profilePic: user.profilePic,
            lastMessage: conversation.lastMessage,
            mock: conversation.mock,
        });
    };

    const isSelected = currConversation?._id === conversation._id;
    const bgColor = isSelected ? (colorMode === "light" ? "gray.600" : "gray.700") : "";
    const textColor = isSelected ? "white" : useColorModeValue("gray.800", "gray.200");

    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={1}
            _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.600", "gray.700"),
                color: "white"
            }}
            onClick={handleClick}
            borderRadius={"md"}
            bg={bgColor}
        >
            <WrapItem>
                <Avatar size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }} src={user.profilePic}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"} color={textColor}>
                    {user.username} <Image src="./verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} color={textColor}>
                    {currUser._id === lastMessage?.sender && lastMessage?.seen && (
                        <Text as="span" color={isSelected ? "white" : "blue.400"}>
                            <BsCheck2All size="16" />
                        </Text>
                    )}
                    {currUser._id === lastMessage?.sender && !lastMessage?.seen && (
                        <Text as="span" color={isSelected ? "white" : "gray.500"}>
                            <BsCheck2All size="16" />
                        </Text>
                    )}
                    {lastMessage?.text.length > 18
                        ? lastMessage.text.substring(0, 18) + "..."
                        : lastMessage?.text || <BsFillImageFill size={16} />}
                </Text>
            </Stack>
        </Flex>
    );
};

export default Conversation;
