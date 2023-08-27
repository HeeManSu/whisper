import React from 'react'
import { useSelector } from 'react-redux'

const SelectedChat = () => {

    const activeChat = useSelector((state) => state.chat)
    console.log(activeChat)

    const { chats } = useSelector(state => state.chat);


    return (
        <div className='bg-white rounded-xl shadow1 h-[97%]'>
            {chats && chats.length > 0 && chats.map((chat, id) => (
                <div key={id}>
                    {activeChat === chat._id &&
                        <div>{chat.chatName}</div>
                    }
                </div>
            ))}
        </div>
    )
}

export default SelectedChat