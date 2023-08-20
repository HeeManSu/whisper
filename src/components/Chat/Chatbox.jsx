import { FiPlusCircle } from "react-icons/fi"
import {  useDisclosure } from '@chakra-ui/react'
// import { messagesPeoples } from '../../utils/data'
import { BsCheck2All } from "react-icons/bs"


import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../redux/actions/user';


const Chatbox = ({ chatype }) => {

  const { isOpen: isPersonModalOpen, onClose: PersonModalClose, onOpen: PersonModalOpen } = useDisclosure();

  return (
    <div className='bg-white rounded-xl shadow1'>
      <div className='px-5 pt-4'>
        <div className='flex  pb-4 justify-between'>
          <h1 className='text-[25px] font-[600]'>Person</h1>

          <button onClick={PersonModalOpen}>
            <FiPlusCircle className='h-[28px] w-[28px] relative top-[5px]' />
          
          </button>
          <NewChatModal isPersonModalOpen={isPersonModalOpen} PersonModalClose={PersonModalClose} />
        </div>

        <div className={`${chatype == "People" ? 'max-h-[260px]' : 'max-h-[192px]'} overflow-x-hidden overflow-y-auto scrollbar-hidden`}>
        </div>
      </div>
    </div >
  )
}

export default Chatbox


const NewChatModal = ({ isPersonModalOpen, PersonModalClose }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  console.log(users);

  useEffect(() => {
    if (username) {
      dispatch(searchUser(username));
    }
  }, [username]);

  return (
    <div>
      <Modal size={'sm'} isOpen={isPersonModalOpen} onClose={PersonModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col items-center'>
              <Input
                required
                id='username'
                name='username'
                type='text'
                placeholder='Enter a username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={PersonModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
