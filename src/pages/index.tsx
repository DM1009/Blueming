import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AiFillSound } from 'react-icons/ai'
import Link from 'next/link'

export default function Home() {
  const [musicPlay, setMusicPlay] = useState(0)

  useEffect(() => {
    setMusicPlay(1) // musicPlay 값을 먼저 업데이트
    setTimeout(() => {
      if (musicPlay === 1) {
        const audio = new Audio('/assets/bgm/0.mp3')
        audio.play()
      }
    }, 4000)
  }, [musicPlay])

  return (
    <div
      className='md:w-2/5 xl:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl main'
      style={{ overflow: 'hidden' }}
    >
      <div className='bg-zinc-700 w-full main flex flex-col justify-center text-center'>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <h1 className='text-3xl text-white font-bold'>{`이 페이지는 
          음악이 있습니다`}</h1>
        </motion.div>
        <motion.div
          className=' flex justify-center mt-4'
          animate={{ opacity: [0, 1] }}
          transition={{
            delay: 4,
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <h1 className='text-8xl text-white font-bold '>
            <AiFillSound />
          </h1>
        </motion.div>
        <motion.div
          className=' flex justify-center mt-4'
          animate={{ opacity: [0, 1] }}
          transition={{
            delay: 1,
            duration: 1,
          }}
        >
          <span
            className='text-2xl text-white font-bold'
            style={{ whiteSpace: 'pre-line' }}
          >
            {`인트로를 들려드릴 테니
            소리를 조절해 주세요`}
          </span>
        </motion.div>
        <motion.div
          className=' flex justify-center mt-4'
          animate={{ opacity: [0, 1] }}
          transition={{
            delay: 7,
            duration: 1,
          }}
        >
          <Link href='/main'>
            <span
              className='text-2xl text-white font-bold cursor-pointer text-blue-300'
              style={{ whiteSpace: 'pre-line' }}
            >
              {`클릭하시면 메인으로 넘어갑니다`}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
