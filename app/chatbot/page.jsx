import React from 'react'
import { Ellipsis,ChevronLeft,SquarePen } from 'lucide-react'
import Message from '@/components/message'
import Bot from '@/components/bot'
const page = () => {
  return (
    <div className='flex flex-col items-center py-4'>
        <div className='w-full bg-white fixed top-0 py-4 flex justify-center'>

      <span className='flex justify-between items-center w-[85%]'>
        <button className='p-2 shadow-[5.92px_11.84px_23.68px_rgba(211,209,216,0.3)] rounded-[10px] flex items-center'> <ChevronLeft /></button>
       
        <h1>Case bot</h1>
        <Ellipsis className="text-[#CBCCCD]" />
      </span>
        </div>
      <div className='chatroom mt-[56px] px-2 overflow-y-scroll' style={{scrollbarWidth : "none"}}>
        <Message img={"image.png"} text={"Natural Foods for Cancer patience"}/>
        <Bot text={`The best time to go to the gym is subjective and varies depending
 on individual preferences and schedules. Some people prefer to
 work out in the morning as it helps them kickstart their day, while
 others prefer to exercise in the evening as they feel more energized
 after a long day at work. Ultimately, the best time to go to the gym
 is when you can consistently commit to exercising and make it a
 part of your routine. It's important to find a time that works best for
 you and stick to it to achieve your fitness goals.`}/>
        <Message img={"image.png"} text={"How Much Pushaps A day"}/>
        <Bot text={`it is recommended to start with 1-2 sets of 10-15 pushups per day
and then gradually increase the number of sets or repetitions as 
you get stronger.`}/>
        <Message img={"image.png"} text={"How Much Pushaps A day"}/>
        <Bot text={`it is recommended to start with 1-2 sets of 10-15 pushups per day
and then gradually increase the number of sets or repetitions as 
you get stronger.`}/>
      </div>
    </div>
  )
}

export default page
