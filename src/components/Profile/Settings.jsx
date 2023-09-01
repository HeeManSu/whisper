import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { Avatar, Button } from '@chakra-ui/react'

const Settings = ({ isSettingOpen, SettingClose }) => {
    return (
        <div>
            <Modal size={'xl'} isOpen={isSettingOpen} onClose={SettingClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-col items-center'>
                            <Avatar size={'xl'} />
                            <h1> change Avatar</h1>
                            <h1>change email</h1>
                            <h1>change password</h1>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={SettingClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Settings