import { FiPlusCircle } from "react-icons/fi"
import { Avatar, useDisclosure } from '@chakra-ui/react'
import { BsCheck2All } from "react-icons/bs"
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../redux/actions/user';
import { createNewChat, fetchAllChats } from "../../redux/reducers/chatSlice";
import toast from 'react-hot-toast'
import { useEffect } from "react";

const GroupChatBox = () => {
    const { isOpen: isGroupModalOpen, onClose: GroupModalClose, onOpen: GroupModalOpen } = useDisclosure();
    const [username, setUsername] = useState("");
    const [chatName, setChatName] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.search);
    const { message, error, chats } = useSelector(state => state.chat);

    const accessChat = (id) => {
        dispatch(createNewChat(id))
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }
    const handleSearchClick = async (e) => {
        e.preventDefault();
        setUsername(e.target.value)
        dispatch(searchUser(e.target.value))
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
        dispatch(fetchAllChats());
    }, []);
    // console.log(currentUser)

    function getSender(currentUser, users) {
        if (currentUser && currentUser._id) {
            return users[0]._id === currentUser._id ? users[1].name : users[0].name;
        }
        return "";
    }


    return (

        <div className="bg-white rounded-xl shadow1 " >
            <div className="px-5 pt-[6px] ">
                <div className="flex pb-4 justify-between">
                    <h1 className="text-[25px] font-[600]">Group</h1>
                    <button onClick={GroupModalOpen} type="button">
                        <FiPlusCircle className="h-[28px] w-[28px] relative top-[5px]" />
                    </button>
                    <Modal size={"sm"} isOpen={isGroupModalOpen} onClose={GroupModalClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>New Group Chat</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form>
                                    <div className="flex flex-col items-center">
                                        <Input
                                            required
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Enter Chatname"
                                            value={username}
                                            onChange={(e) => setChatName(e.target.value)}
                                        />
                                        <Input
                                            required
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Search Users"
                                            value={username}
                                           onChange={handleSearchClick}
                                        />
                                    </div>
                                </form>
                                <div className="flex flex-col pt-5">
                                    {users && users.length > 0 && username.length !== 0 && users.map((user, id) => (
                                        <button
                                            key={id}
                                            onClick={() => accessChat(user._id)}
                                            className="border-2 pl-4 bg-white rounded-xl flex shadow1 py-3"
                                        >
                                            <Avatar size='md' src={user.avatar.url} alt={`Avatar of ${user.username}`} />
                                            <div className="pl-5 text-start">
                                                <h1 className="text-black text-[17px]">{user.username}</h1>
                                                <h1 className="text-gray-500">{user.name}</h1>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" type="button" onClick={GroupModalClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
                <div>
                    <div className="h-[202px] overflow-scroll scrollbar-hidden" >
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupChatBox