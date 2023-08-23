import { FiPlusCircle } from "react-icons/fi"
import { useDisclosure } from '@chakra-ui/react'
// import { messagesPeoples } from '../../utils/data'
import { BsCheck2All } from "react-icons/bs"


import React, {useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../redux/actions/user';


const Chatbox = () => {
  const { isOpen: isPersonModalOpen, onClose: PersonModalClose, onOpen: PersonModalOpen } = useDisclosure();

  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.search);
  // console.log(users)




  const handleSearchClick = async (e) => {
    e.preventDefault();
    setUsername(e.target.value)
    dispatch(searchUser(e.target.value))
  }

  return (

    <div className="bg-white rounded-xl shadow1">
      <div className="px-5 pt-4">
        <div className="flex pb-4 justify-between">
          <h1 className="text-[25px] font-[600]">Person</h1>
          <button onClick={PersonModalOpen} type="button">
            <FiPlusCircle className="h-[28px] w-[28px] relative top-[5px]" />
          </button>
          <Modal size={"sm"} isOpen={isPersonModalOpen} onClose={PersonModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                >
                  <div className="flex flex-col items-center">
                    <Input
                      required
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter a username"
                      value={username}
                      onChange={handleSearchClick}
                    />
                  </div>

                </form>

                {users && users.length > 0 && users.map((user, id) => (
                  <div key={id}>{user.username}</div>
                ))}
              </ModalBody>


              <ModalFooter>
                <Button colorScheme="blue" type="button" onClick={PersonModalClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>


  );
};

export default Chatbox;