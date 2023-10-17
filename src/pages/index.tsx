import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AiFillSound } from 'react-icons/ai'
import Link from 'next/link'

export default function Home() {
  const [musicPlay, setMusicPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleMusic = () => {
    if (audioRef.current) {
      const audio = audioRef.current

      if (musicPlay) {
        setMusicPlay(false)
        audio.pause()
        audio.load() // 노래를 다시 로딩
      } else {
        setMusicPlay(true)
        audio.play()
      }
    }
  }

  const handleMainClick = () => {
    if (musicPlay) {
      // 클릭 시 음악이 재생 중인 경우, 음악을 멈춥니다.
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.load()
      }
      setMusicPlay(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 1500)
  }, [])
  return (
    <>
      {isLoading ? (
        <div
          className='md:w-2/5 xl:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl font-index'
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <div
            className='bg-zinc-700 w-full main flex flex-col justify-center text-center'
            style={{ height: '100vh', overflow: 'hidden' }}
          >
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 1 }}
            >
              <h1 className='text-3xl text-white font-bold'>{`이 페이지는 
          음악이 있습니다`}</h1>
            </motion.div>
            <motion.div
              className=' flex justify-center mt-4'
              animate={{ opacity: [0, 1] }}
              transition={{
                delay: 2,
                duration: 1,
              }}
            >
              <h1
                className='text-8xl text-white font-bold '
                onClick={handleMusic}
              >
                <AiFillSound />
              </h1>
              <audio ref={audioRef} src='/assets/bgm/0.mp3' />
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
                {`스피커를 누르면 노래가 나옵니다
            들으면서 소리를 조절해 주세요`}
              </span>
            </motion.div>
            <motion.div
              className=' flex justify-center mt-4'
              animate={{ opacity: [0, 1] }}
              transition={{
                delay: 4,
                duration: 1,
              }}
            >
              <Link href='/main'>
                <span
                  className='text-2xl font-bold cursor-pointer text-blue-300'
                  style={{ whiteSpace: 'pre-line' }}
                  onClick={handleMainClick}
                >
                  {`클릭하시면 메인으로 넘어갑니다`}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
