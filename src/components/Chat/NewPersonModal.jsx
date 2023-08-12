import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Input, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
import { searchUser } from '../../redux/actions/user';

const NewPersonModal = ({ isPersonModalOpen, PersonModalClose }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)
  // useEffect(() => {
  //   if (username !== user?.username) {
  //     dispatch(searchUser(username));
  //   }
  // }, [username, dispatch]);

  return (
    <div>
      <Modal size={'sm'} isOpen={isPersonModalOpen} onClose={PersonModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add your notification content here */}
            <div className='flex flex-col items-center'>
              <Input
                required
                id='username'
                name='username'
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* <Text>{user ? `Username: ${user.username}` : ""}</Text> */}

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={PersonModalClose}>
              Close
            </Button>
            {/* Add additional buttons or actions here */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default NewPersonModal