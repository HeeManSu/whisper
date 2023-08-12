import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Avatar, Button } from '@chakra-ui/react'

const Profile = ({ isProfileOpen, ProfileClose }) => {
    return (
        <div>
            <Modal size={'xl'} isOpen={isProfileOpen} onClose={ProfileClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Add your notification content here */}
                        <div className='flex flex-col items-center'>
                            <Avatar size={'xl'} />
                            <h1>Himanshu Sharma</h1>
                       <div className='flex'>
                        <h1>online</h1>
                       </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={ProfileClose}>
                            Close
                        </Button>
                        {/* Add additional buttons or actions here */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Profile