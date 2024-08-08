import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtom';
import userAtom from '../atoms/userAtom';
import { useSocket } from '../context/SocketContext';

const MessageContainer = () => {
    const messageRef = useRef(null);
    const showToast = useShowToast();
    const [currConversation, setCurrConversation] = useRecoilState(selectedConversationAtom);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState([]);
    const currUser = useRecoilValue(userAtom);
    const { socket } = useSocket();
    const setConversations = useSetRecoilState(conversationsAtom);
    const host = "https://talktime-erub.onrender.com";
    useEffect(() => {
        const handleNewMessage = (message) => {
            if (currConversation._id === message.conversationId) {
                setMessages((prev) => [...prev, message]);
            }
            setConversations((prev) => {
                const updatedConversations = prev.map((conversation) => {
                    if (conversation._id === message.conversationId) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: message.text,
                                sender: message.sender,
                            },
                        };
                    }
                    return conversation;
                });
                return updatedConversations;
            });
        };

        socket.on('newMessage', handleNewMessage);

        return () => socket.off('newMessage', handleNewMessage);
    }, [socket, currConversation._id, setConversations]);

    useEffect(() => {
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currUser._id;
		if (lastMessageIsFromOtherUser) {
			socket.emit("markMessagesAsSeen", {
				conversationId: currConversation._id,
				userId: currConversation.userId,
			});
		}

		socket.on("messagesSeen", ({ conversationId }) => {
			if (currConversation._id === conversationId) {
				setMessages((prev) => {
					const updatedMessages = prev.map((message) => {
						if (!message.seen) {
							return {
								...message,
								seen: true,
							};
						}
						return message;
					});
					return updatedMessages;
				});
			}
		});
	}, [socket, currUser._id, messages, currConversation]);
    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true);
            setMessages([]);
            try {
                if (currConversation.mock) {
                    return;
                }
                const res = await fetch(`/api/messages/${currConversation.userId}`, {
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setMessages(data);
            } catch (err) {
                showToast('Error', err.message, 'error');
            } finally {
                setLoadingMessages(false);
            }
        };
        getMessages();
    }, [showToast, currConversation.userId]);

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Flex
            flex={"70"}
            bg={useColorModeValue("black", "gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
            p={2}
        >
            {/* Message Header */}
            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src={currConversation.profilePic} size={"sm"} />
                <Text display={"flex"} alignItems={"center"} color={useColorModeValue("black","white")}>
                    {currConversation.username} <Image src='./verified.png' w={4} h={4} ml={1} />
                </Text>
            </Flex>
            <Divider />

            <Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
                {loadingMessages &&
                    [0, 1, 2, 3, 4].map((_, i) => (
                        <Flex
                            key={i}
                            gap={2}
                            alignItems={"center"}
                            p={1}
                            borderRadius={"md"}
                            alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                        >
                            {i % 2 === 0 && <SkeletonCircle size={7} />}
                            <Flex flexDir={"column"} gap={2}>
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />
                            </Flex>
                            {i % 2 !== 0 && <SkeletonCircle size={7} />}
                        </Flex>
                    ))}
                {!loadingMessages &&
                    messages.map((message) => (
                        <Flex
                            key={message._id}
                            direction={"column"}
                            ref={messages.length - 1 === messages.indexOf(message) ? messageRef : null}
                        >
                            <Message
                                key={message._id}
                                message={message}
                                ownMessage={currUser._id === message.sender}
                            />
                        </Flex>
                    ))}
            </Flex>
            <MessageInput setMessages={setMessages} />
        </Flex>
    );
};

export default MessageContainer;
