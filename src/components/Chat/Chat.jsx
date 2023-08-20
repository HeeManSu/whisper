import React, { useEffect, useState } from 'react'
import settings from "../../assets/settings.svg"
import chat from "../../assets/chat.svg"
import notification from "../../assets/notification.svg"
import logoutImage from "../../assets/logout.svg"
import person from "../../assets/person.svg"
import { Avatar, Button, Input } from '@chakra-ui/react'
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'
import Settings from '../Profile/Settings'
import { FiSearch } from "react-icons/fi"
import Chatbox from './Chatbox'
import { messagesGroups, messagesPeoples } from '../../utils/data'
import { getAllPersonChats } from '../../redux/actions/chat'


const Chat = () => {
  const [activeChat, setActiveChat] = useState(false);
  const [activeSettings, setActiveSettings] = useState(false);
  const [activeNotification, setActiveNotification] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { isOpen: isProfileOpen, onClose: ProfileClose, onOpen: ProfileOpen } = useDisclosure();
  const { isOpen: isNotificationOpen, onClose: NotificationClose, onOpen: NotificationOpen } = useDisclosure();
  const { isOpen: isSettingOpen, onClose: SettingClose, onOpen: SettingOpen } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    setActiveChat(true); // Set activeChat to true when component mounts
  }, []);


  // useEffect(() => {
  //   dispatch(getAllPersonChats())
  // }, [dispatch])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    // console.log(search)
  };

  let filteredData = [...messagesGroups, ...messagesPeoples].filter((currItem) => {
    if (search == "") {
      return currItem;
    } else if (currItem?.chatName?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())) {
      return currItem;
    }
  })

  useEffect(() => {
    setSearchResult(filteredData)
  }, [search])

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className='bg-[#DFECF4]'>
      <div className='grid1 h-screen mx-6'>
        <div className='my-6 rounded-3xl flex py-7 items-center justify-between flex-col bg-[#6E00FF]'>
          <div className='flex flex-col items-center'>
            <button onClick={() => {
              ProfileOpen();
            }}>
              <Avatar css={{
                height: '80px',
                width: '80px',
                border: '4px solid #5322BC',
                borderRadius: '50%'
              }} src={person} />
              <Profile isProfileOpen={isProfileOpen} ProfileClose={ProfileClose} />
            </button>

            <div className={`pt-16 flex flex-col gap-7  `}>

              <div onClick={() => {
                setActiveChat(true);
                setActiveNotification(false);
                setActiveSettings(false);
              }} className={`flex items-center h-[60px]   ${activeChat ? "bg-[#612DD1] border-r-[6px] border-[#F3B559]" : ""}`}>
                <img className='w-44 h-[34px] flex items-center relative left-1' src={chat} alt="no-image" />
              </div>


              <button onClick={() => {
                NotificationOpen();
                setActiveNotification(true);
                setActiveSettings(false);
                setActiveChat(false);
              }} >
                <div className={`flex items-center h-[60px]   ${activeNotification ? "bg-[#612DD1] border-r-[6px] border-[#F3B559]" : ""}`}>
                  <img className='w-44 h-[45px]' src={notification} alt="no-image" />

                </div>

                <Modal isOpen={isNotificationOpen} onClose={NotificationClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Notification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* Add your notification content here */}
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={NotificationClose}>
                        Close
                      </Button>
                      {/* Add additional buttons or actions here */}
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </button>
              <button onClick={() => {
                SettingOpen();
                setActiveSettings(true);
                setActiveChat(false);
                setActiveNotification(false);
              }}>
                <div className={`flex items-center h-[60px]  ${activeSettings ? "bg-[#612DD1] border-r-[6px] border-[#F3B559]" : ""}`}>
                  <img className='w-52 h-[40px]' src={settings} alt="no-image" />
                </div>

                <Settings isSettingOpen={isSettingOpen} SettingClose={SettingClose} />
              </button>

            </div>
          </div>

          <button onClick={logoutHandler}>
            <img className='h-[42px] w-[42px]' src={logoutImage} alt="" />
          </button>
        </div>
        <div className='my-6  bg-transparent'>
          <div className='flex gap-6 flex-col'>
            <div>
              <SearchBox search={search} setSearch={setSearch} handleSearch={handleSearch} />
            </div>
            <div>

              
              <Chatbox chatype="People"  />

            </div>
            <div>
              {/* <Chatbox chatype="Groups" data={searchResult.length > 0 ? searchResult : messagesGroups} /> */}
            </div>
          </div>

        </div>
        <div className='my-6  bg-red-600'>
        </div>
      </div>
    </div>



  )
}

export default Chat

const SearchBox = ({ search, handleSearch }) => {
  return (
    <div className="flex w-[100%] mx-auto pl-4 py-[5px] shadow1 items-center rounded-[14px] bg-white">
      <FiSearch className='h-[32px] w-[32px] text-[#7c7c7c]' />
      <input
        className='w-full h-full text-[20px] py-2 bg-transparent focus:outline-none border-none  pl-3'
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) =>
          handleSearch(e)
        }
      />
    </div>
  );
};




//               <Chatbox chatype="People" data={searchResult.length > 0 ? searchResult : messagesPeoples} />