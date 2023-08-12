import React from 'react'
import { FiPlusCircle } from "react-icons/fi"
import { Avatar, useDisclosure } from '@chakra-ui/react'
// import { messagesPeoples } from '../../utils/data'
import { BsCheck2All } from "react-icons/bs"
import NewPersonModal from './NewpersonModal'
import { useSelector } from 'react-redux'


const Chatbox = ({ chatype }) => {

  const { isOpen: isPersonModalOpen, onClose: PersonModalClose, onOpen: PersonModalOpen } = useDisclosure();

  const { personChats } = useSelector(state => state.chats);
  // console.log(personChats)


  return (
    <div className='bg-white rounded-xl shadow1'>
      <div className='px-5 pt-4'>
        <div className='flex  pb-4 justify-between'>
          <h1 className='text-[25px] font-[600]'>Person</h1>

          <button onClick={PersonModalOpen}>
            <FiPlusCircle className='h-[28px] w-[28px] relative top-[5px]' />
            <NewPersonModal isPersonModalOpen={isPersonModalOpen} PersonModalClose={PersonModalClose} />
          </button>

        </div>

        <div className={`${chatype == "People" ? 'max-h-[260px]' : 'max-h-[192px]'} overflow-x-hidden overflow-y-auto scrollbar-hidden`}>
        
          {personChats.map((person, index) => (
            // console.log(person.avatar),
            <div key={index}>
              <div className='flex justify-between' >
                <div className='flex gap-7'>
                  <Avatar css={{ width: "47px", height: "47px" }} src={person.avatar} />
                
                  <div className='flex flex-col'>
                    <h1 className='text-[17px] text-[#303030] font-semibold'>{person.chatName}</h1>
                    <h1 className='text-[15px] relative bottom-[5px] text-[#303030] font-normal'>{person.latestMessage}</h1>
                  </div>
                </div>
                <div className='pl-3'>
                  <span className='text-[14px] text-[#303030] font-[400]'>{person.chatName}</span>

                  <BsCheck2All fontWeight='600' className={`text-[20px] relative left-4  ${person.status == "seen" ? 'text-blue-600' : ''}`} />
                </div>
              </div>

              <div className='w-[95%] mb-[10px] mx-auto border bg-opacity-[66%] mt-2 bg-[#B4ABAB]'>

              </div>
            </div>

          ))}

        </div>

      </div>
    </div >
  )
}

export default Chatbox


  // < div className = 'bg-white rounded-xl shadow1' >
  //   <div className='px-5 pt-4'>
  //     <div className='flex  pb-4 justify-between'>
  //       <h1 className='text-[25px] font-[600]'>{chatype}</h1>

  //       <button onClick={PersonModalOpen}>
  //         <FiPlusCircle className='h-[28px] w-[28px] relative top-[5px]' />
  //         <NewPersonModal isPersonModalOpen={isPersonModalOpen} PersonModalClose={PersonModalClose} />
  //       </button>

  //     </div>

  //     <div className={`${chatype == "People" ? 'max-h-[260px]' : 'max-h-[192px]'} overflow-x-hidden overflow-y-auto scrollbar-hidden`}>
  //       {data.map((person, index) => (

  //         <div key={index}>
  //           <div className='flex justify-between' >
  //             <div className='flex gap-7'>
  //               <Avatar css={{ width: "47px", height: "47px" }} src={person.avatar} />
  //               <div className='flex flex-col'>
  //                 <h1 className='text-[17px] text-[#303030] font-semibold'>{person.chatName}</h1>
  //                 <h1 className='text-[15px] relative bottom-[5px] text-[#303030] font-normal'>{person.latestMessage}</h1>
  //               </div>
  //             </div>
  //             <div className='pl-3'>
  //               <span className='text-[14px] text-[#303030] font-[400]'>{person.sentTime}</span>

  //               <BsCheck2All fontWeight='600' className={`text-[20px] relative left-4  ${person.status == "seen" ? 'text-blue-600' : ''}`} />
  //             </div>
  //           </div>

  //           <div className='w-[95%] mb-[10px] mx-auto border bg-opacity-[66%] mt-2 bg-[#B4ABAB]'>

  //           </div>
  //         </div>

  //       ))}

  //     </div>

  //   </div>
  //   </ >