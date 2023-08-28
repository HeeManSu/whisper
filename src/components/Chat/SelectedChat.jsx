import { Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserItem } from './GroupChatBox';

const SelectedChat = () => {
  const activeChat = useSelector((state) => state.chat.activeChat);
  console.log(activeChat);
  const { chats } = useSelector(state => state.chat);


  const { isOpen: isPersonModalOpen, onClose: PersonModalClose, onOpen: PersonModalOpen } = useDisclosure();
  const { isOpen: isGroupModalOpen, onClose: GroupModalClose, onOpen: GroupModalOpen } = useDisclosure();

  const handleModal = () => {
    if (activeChat && !activeChat.isGroupChat) {
      PersonModalOpen();
    } else {
      GroupModalOpen();
    }
  };


  return (
    <div className='bg-white rounded-xl shadow1 h-[97%]'>
      {activeChat ? (
        <div className='px-[30px] pt-[20px]'>
          <div className='flex justify-between'>
            <div className='flex cursor-pointer gap-4 items-center'>
              <Avatar size="md" src={activeChat.avatar?.url} /> {/* Use optional chaining to handle null avatar.url */}
              <h1 className='text-[18px] flex items-center font-[500]'>{activeChat?.chatName}</h1>
            </div>
            <BsThreeDotsVertical
              onClick={handleModal}
              className='mt-2 cursor-pointer'
              size="27px"
            />
          </div>
          <div className='bg-gray-400 h-[1.5px] mt-[10px]'></div>
        </div>
      ) : (
        <div className='flex items-center h-full justify-center'>No chat selected</div>
      )}
      <ProfileModal activeChat={activeChat} isOpen={isPersonModalOpen} onClose={PersonModalClose} />
      <GroupProfileModal activeChat={activeChat} isOpen={isGroupModalOpen} onClose={GroupModalClose} />
    </div>
  );
};

export default SelectedChat;

const ProfileModal = ({ activeChat, isOpen, onClose }) => {
  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='flex gap-4 flex-col items-center'>
            <div className='text-[20px] font-[500]'> {activeChat?.chatName}</div>
            <Avatar size="2xl" src={activeChat?.avatar?.url} />
            <div className='text-[18px]'>{activeChat?.users[1]?.email}</div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const GroupProfileModal = ({ activeChat, isOpen, onClose }) => {
  // console.log(activeChat.users.length)
  const handleDeleteFunction = (userId) => {
    // setGroupUsers(groupUsers.filter(user => user._id !== userId));
  };

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='flex flex-col'>
            <h1 className='text-[25px] text-center font-[600]'>{activeChat?.chatName}</h1>
            <div className='flex pl-[12px] flex-wrap gap-2 mt-[9px]'>
              {
                activeChat?.users && activeChat?.users?.length > 0 && activeChat?.users?.map((user, id) => {
                  return (
                    <UserItem user={user} deleteFunction={handleDeleteFunction} key={id} />

                  )
                })
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
