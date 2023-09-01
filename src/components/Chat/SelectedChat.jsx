import { Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, Input, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
// import { UserItem } from './GroupChatBox';
import { useDispatch } from 'react-redux';
import { addToGroup, fetchAllGroupChats, renameGroupChat, resetGroupUsers, updateGroupUsers } from '../../redux/reducers/chatSlice';
import { RxCross2 } from "react-icons/rx"
import { loadUser, searchUser } from '../../redux/actions/user';
import { useRef } from 'react';
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader';
import { fetchAllMessages, sendMessages, setMessages } from '../../redux/reducers/messageSlice';



const SelectedChat = () => {
  const activeChat = useSelector((state) => state.chat.activeChat);
  // console.log(activeChat)

  const { isOpen: isPersonModalOpen, onClose: PersonModalClose, onOpen: PersonModalOpen } = useDisclosure();
  const { isOpen: isGroupModalOpen, onClose: GroupModalClose, onOpen: GroupModalOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [content, setcontent] = useState("");
  const [currentUser, setCurrentUser] = useState();

  const messages = useSelector((state) => state.message.messages)

  const { error, allMessages } = useSelector(state => state.message);
  // console.log(allMessages)

  const dispatch = useDispatch();

  const handleModal = () => {
    if (activeChat && !activeChat.isGroupChat) {
      PersonModalOpen();
    } else {
      GroupModalOpen();
    }
  };

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && content) {
      event.preventDefault();
      const { payload } = await dispatch(sendMessages({ content, chatId: activeChat?._id }));
      // console.log(payload)
      setcontent("");
      // console.log(payload?.chatMessage)
      dispatch(setMessages({ messages: [...messages, payload?.chatMessage] }))
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  };

  const typingHandler = (e) => {
    setcontent(e.target.value);
  }


  const fetchMessages = async () => {
    if (!activeChat) {
      return;
    }
    const { payload } = await dispatch(fetchAllMessages({ chatId: activeChat?._id }));
    dispatch(setMessages({ messages: [...messages, payload?.allMessages] }))
  }

  useEffect(() => {
    fetchMessages();
  }, [activeChat])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  console.log(currentUser)

  function getSenderName(currentUser, users) {
    if (currentUser && currentUser._id) {
      return users[0]._id === currentUser._id ? users[1].name : users[0].name;
    }
    return "";
  }

  function getSenderAvatar(currentUser, users) {
    if(currentUser && currentUser._id) {
      return users[0]._id === currentUser._id ? users[1]?.avatar?.url : users[0]?.avatar?.url;
    }

    
  }






  return (
    <div className='bg-white rounded-xl shadow1 h-[97%]'>
      {activeChat ? (
        <div className='px-[30px] pt-[20px]'>
          <div className='flex justify-between'>
            <div className='flex cursor-pointer gap-4 items-center'>
              <Avatar size="md" src={getSenderAvatar(currentUser, activeChat?.users)} />
              <h1 className='text-[18px] flex items-center font-[500]'>{getSenderName(currentUser, activeChat?.users)}</h1>
            </div>
            <BsThreeDotsVertical
              onClick={handleModal}
              className='mt-2 cursor-pointer'
              size="27px"
            />
          </div>
          <div className='bg-gray-400 h-[1.5px] mt-[10px]'></div>

          {
            loading ? (
              <Loader />
            ) : (
              <div className='bg-blue-50 mt-[15px]'>
                <div className='h-[73vh] w-full'>

                </div>
              </div>
            )
          }

          <form onKeyDown={sendMessage}>
            <Input
              paddingY='5'
              placeholder='Enter the message'
              boxShadow='0px 4px 5px 2px rgba(121, 197, 239, 0.38)'
              onChange={typingHandler}
              value={content}
            />
          </form>
        </div>
      ) : (
        <div className='flex items-center h-full justify-center'>No chat selected</div>
      )}
      <ProfileModal activeChat={activeChat} isOpen={isPersonModalOpen} onClose={PersonModalClose} />
      <GroupProfileModal activeChat={activeChat} isOpen={isGroupModalOpen} onOpen={isGroupModalOpen} onClose={GroupModalClose} />
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

const GroupProfileModal = ({ activeChat, isOpen, onClose, onOpen }) => {

  const dispatch = useDispatch();
  const groupUsers = useSelector((state) => state.chat.groupUsers);
  // console.log(groupUsers)
  const [newChatName, setNewChatName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const { message, error, loading } = useSelector(state => state.chat);
  const { users } = useSelector(state => state.search)

  const updateButtonRef = useRef(null);

  // useEffect(() => {
  //   if (activeChat?.users && JSON.stringify(activeChat.users) !== JSON.stringify(groupUsers)) {
  //     dispatch(updateGroupUsers({ groupUsers: activeChat.users }));
  //   }
  // }, [activeChat?.users]);

  const handleDeleteFunction = (userId) => {
    dispatch(updateGroupUsers({ groupUsers: groupUsers.filter((user) => user._id !== userId) }));
  };

  const changeGroupNameHandler = (newChatName, chatId) => {
    // console.log(newChatName, chatId);
    dispatch(renameGroupChat({ newChatName, chatId }));
    onClose();
    dispatch(loadUser())

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  };

  const handleSearchClick = (e) => {
    const newUsername = e.target.value;
    setNewUserName(newUsername);
    dispatch(searchUser(newUsername));
  }

  const addToGroupHandler = (chatId, userId, user) => {

    dispatch(addToGroup({ chatId, userId }))
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }

  const handleCloseModal = () => {
    dispatch(resetGroupUsers());
    onClose();
  };

  return (
    <Modal scrollBehavior='inside' size={"md"} isOpen={isOpen} onClose={handleCloseModal}>
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
            <div className='flex justify-around mt-[10px]'>
              <Input
                w="70%"
                required
                id="newChatName"
                name="newChatName"
                type="text"
                placeholder="Enter new chatname"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    updateButtonRef.current.click();
                  }
                }}
              />
              <Button
                isLoading={loading}
                ref={updateButtonRef}
                type='button'
                colorScheme='blue'
                onClick={() => changeGroupNameHandler(newChatName, activeChat?._id)}
              >
                Update
              </Button>
            </div>
            <Input
              required
              id='newUserName'
              name='newUserName'
              type='text'
              placeholder='Add new users'
              value={newUserName}
              onChange={handleSearchClick}
            />
            <div className="flex flex-col pt-5">
              {users && users.length > 0 && newUserName?.length !== 0 && users.slice(0, 4).map((user, id) => (
                <button
                  key={id}
                  onClick={() => addToGroupHandler(activeChat._id, user._id, user)}
                  className="border-2 pl-4 bg-white rounded-xl flex shadow1 py-3"
                >
                  {user?.avatar && user?.avatar?.url ? (
                    <Avatar size='md' src={user?.avatar?.url} alt={`Avatar of ${user?.username}`} />
                  ) : (
                    <Avatar size='md' alt={`Avatar of ${user?.username}`} />
                  )}
                  <div className="pl-5 text-start">
                    <h1 className="text-black text-[17px]">{user?.username}</h1>
                    <h1 className="text-gray-500">{user?.name}</h1>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


const UserItem = ({ user, deleteFunction }) => {
  const handleDeleteClick = () => {
    deleteFunction(user._id);
  };
  return (
    <div className="bg-blue-600 gap-2 flex justify-center pl-[12px] pb-[5px] items-center text-white px-[8px] py-[3px] text-center rounded-full">
      <h1>{user.name}</h1>
      <RxCross2 className="cursor-pointer" onClick={handleDeleteClick} />
    </div>
  );
}

