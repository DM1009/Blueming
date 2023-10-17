import React, { useEffect, useRef, useState } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import { AiOutlineSend } from 'react-icons/ai'
import { RiCalendarTodoFill } from 'react-icons/ri'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Talk from '@/components/talk'

import Modal from '@/components/modal'
import Map from '@/components/map'
import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {}

export default function Main(props: HomeProps): JSX.Element {
  const [chatText, setChatText] = useState<string>('')
  const [stage, setStage] = useState<number>(0)
  const [isMap, setIsMap] = useState<boolean>(false)
  const [isDebug, setIsDebug] = useState<number>(0)
  const [isOpenDebug, setIsOpenDebug] = useState<boolean>(false)
  const [isDebugValue, setIsDebugValue] = useState<number>(0)
  const [imoticon, setImoticon] = useState<boolean>(false)
  const [myImoticonText, setMyImoticonText] = useState<string>(``)
  const myImoticonRef1 = useRef<HTMLHeadingElement>(null)
  const myImoticonRef2 = useRef<HTMLHeadingElement>(null)
  const myImoticonRef3 = useRef<HTMLHeadingElement>(null)
  const [placeholderText, setPlaceholderText] =
    useState<string>(`뭐해? 라고 입력해보세요!`)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleSendText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (stage === 0 && chatText === '뭐해?') {
      setChatText('')
      setStage(1)
      setPlaceholderText('')
      console.log(stage)
    } else if (stage >= 1) {
      setChatText('')
    } else {
      setChatText('')
      alert('뭐해? 라고 입력해보세요')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (stage === 0 && chatText === '뭐해?') {
        setChatText('')
        setStage(1)
        setPlaceholderText('')
        console.log(stage)
      } else if (stage >= 1) {
        setChatText('')
      } else {
        setChatText('')
        alert('뭐해? 라고 입력해보세요')
      }
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setStage(isDebugValue)
    }
  }
  const handleDebug = () => {
    setIsDebug((prev) => prev + 1)
  }

  const handlePlaceholderText = () => {
    setMyImoticonText((prevText) => {
      if (prevText === `😘`) {
        setPlaceholderText('네가 보고싶어')
      } else if (prevText === `🤔`) {
        setPlaceholderText('밥이나 먹자 할까?')
      } else if (prevText === `😐`) {
        setPlaceholderText('포커페이스')
      }
      return prevText
    })
  }

  const handleImoticonText = () => {
    setStage(3)
    setImoticon(false)
    setTimeout(() => {
      setStage(4)
    }, 5000)
  }

  const handleImoticon = () => {
    setImoticon((prevState) => !prevState)
    console.log(imoticon)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isDebug > 4) {
      setIsOpenDebug(true)
    }
    if (stage === 1) {
      const audio = new Audio('/assets/bgm/1.mp3')
      audio.play()
      setTimeout(() => {
        setStage(2)
        console.log(stage)
      }, 8500)
    }
    if (stage === 3) {
      const audio = new Audio('/assets/bgm/2.mp3')
      audio.play()
      setTimeout(() => {
        console.log(stage)
      }, 8500)
    }
    if (stage === 6) {
      setPlaceholderText('')
      const audio = new Audio('/assets/bgm/3.mp3')
      audio.play()
      setTimeout(() => {
        console.log(stage)
        setStage(7)
      }, 12000)
    }

    if (stage === 8) {
      const audio = new Audio('/assets/bgm/4.mp3')
      audio.play()
      setTimeout(() => {
        console.log(stage)
        setStage(9)
      }, 2000)
    }
    if (stage === 9) {
      setIsMap(true)
      setTimeout(() => {
        console.log(stage)
        setStage(10)
      }, 5000)
    }
    if (stage === 11) {
      const audio = new Audio('/assets/bgm/5.mp3')

      const audioContext = new (window.AudioContext || window.AudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaElementSource(audio)

      source.connect(analyser)
      analyser.connect(audioContext.destination)

      analyser.fftSize = 256

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      const drawSpectrum = () => {
        analyser.getByteFrequencyData(dataArray)
        const canvas = canvasRef.current

        if (canvas) {
          // canvas가 렌더링된 후에만 작업을 수행합니다.
          const ctx = canvas.getContext('2d')
          const canvasWidth = canvas.width
          const canvasHeight = canvas.height

          if (ctx === null) {
            console.error('캔버스 컨텍스트를 가져올 수 없습니다.')
            return
          }

          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          const barWidth = (canvasWidth / bufferLength) * 2.5
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvasHeight
            const hue = (i / bufferLength) * 360

            ctx.fillStyle = `rgba(100, 10, ${hue + 100},0.3)`
            ctx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight)

            x += barWidth + 1
          }

          requestAnimationFrame(drawSpectrum)
        }
      }
      audio.crossOrigin = 'anonymous'
      audio.play()
      drawSpectrum()
    }
  }, [isDebug, stage])

  return (
    <div className='font-main'>
      {stage === 11 ? (
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <div className='md:w-2/5 xl:w-1/5 w-full flex flex-col justify-center mx-auto rounded-2xl main'>
            <div>
              <motion.div
                className='flex justify-center mb-4'
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 2, duration: 1 }}
              >
                <Link href={'/'}>
                  <h1 className='mt-4 text-3xl cursor-pointer text-with-stroke my-custom-font2'>
                    감사합니다
                  </h1>
                </Link>
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 1 }}
              >
                <Image
                  className='md:w-2/5 lg:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl absolute top-0 opacity-50 main'
                  style={{ overflow: 'hidden', zIndex: 1 }}
                  alt='bg'
                  src={'/assets/img/bg.png'}
                  width={1000}
                  height={1000}
                />
                <div className='flex justify-center z-30'>
                  <Image
                    className='rounded-xl relative'
                    alt='cover'
                    src={'/assets/img/cover.jpg'}
                    width={200}
                    height={200}
                    style={{ zIndex: 3 }}
                  />
                </div>
              </motion.div>
              <div className='flex justify-center z-1'>
                <canvas
                  className=' w-2/3'
                  ref={canvasRef}
                  width={300}
                  height={70}
                  style={{ zIndex: 1 }}
                ></canvas>
              </div>
              <div className='flex justify-center text-center'>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 2, duration: 1 }}
                  style={{ zIndex: 4 }}
                >
                  <Link href={'/'}>
                    <h1 className='mt-4 text-3xl cursor-pointer text-with-stroke my-custom-font1'>
                      다시 하기
                    </h1>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: stage === 11 ? [1, 0] : 1 }}
          transition={{ duration: stage === 11 ? 1 : 0 }}
        >
          <div
            className='md:w-3/5 xl:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl main border-blue-300'
            style={{ overflow: 'hidden' }}
          >
            <div
              className='flex justify-between bg-blue-500 rounded-t-xl'
              style={{ height: '40px' }}
            >
              {stage === 10 ? (
                <motion.div
                  animate={{
                    y: [10, 10],
                    scale: [1, 2],
                  }}
                  transition={{
                    duration: 1,
                    ease: 'backInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <button
                    className='text-xl ml-4 font-extrabold text-white'
                    onClick={() => {
                      setStage(11)
                    }}
                  >
                    <FaArrowLeft />
                  </button>
                </motion.div>
              ) : (
                <button className='text-xl ml-4 font-extrabold text-white'>
                  <FaArrowLeft />
                </button>
              )}

              <h1
                className='text-xl my-auto text-white font-bold'
                onClick={handleDebug}
              >
                S
              </h1>
              {isOpenDebug && (
                <input
                  type='number'
                  className='my-auto text-xl mx-4 px-2 md:px-4 bg-blue-200 rounded-md border-2'
                  value={isDebugValue}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10)
                    setIsDebugValue(newValue)
                  }}
                  onKeyUp={handleEnter}
                />
              )}
              {stage === 4 ? (
                <motion.div
                  animate={{
                    y: [10, 10],
                    scale: [1, 2],
                  }}
                  transition={{
                    duration: 1,
                    ease: 'backInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <button
                    className='text-xl mr-4 text-white'
                    onClick={openModal}
                  >
                    <RiCalendarTodoFill />
                  </button>
                </motion.div>
              ) : (
                <button className='text-xl mr-4 text-white'>
                  <RiCalendarTodoFill />
                </button>
              )}
            </div>
            <div className='bg-white justify-center text-center talk'>
              {stage < 9 ? (
                <div>
                  <Talk
                    stage={stage}
                    myImoticonText={myImoticonText}
                    setStage={setStage}
                  />
                  <Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    stage={stage}
                    setStage={setStage}
                  ></Modal>
                </div>
              ) : (
                <div></div>
              )}
              {isMap ? (
                <>
                  <motion.div
                    animate={{
                      x: [300, 0],
                    }}
                    transition={{
                      duration: 1,
                      ease: 'backInOut',
                    }}
                  >
                    <Map />
                  </motion.div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              className='flex flex-row justify-between my-auto border-2 rounded-b-xl border-blue-500'
              style={{ height: '45px' }}
            >
              {stage === 2 ? (
                <button
                  className='text-blue-700 text-2xl ml-4'
                  onClick={handleImoticon}
                >
                  <motion.div
                    animate={{
                      scale: [1, 2],
                    }}
                    transition={{
                      duration: 1,
                      ease: 'backInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <FaRegSmile />
                  </motion.div>
                </button>
              ) : (
                <button className='text-blue-700 text-2xl ml-4 '>
                  <FaRegSmile />
                </button>
              )}

              <input
                type='text'
                className='my-auto text-xl mx-4 px-2 md:px-4 bg-blue-100 rounded-md'
                value={chatText}
                placeholder={placeholderText}
                onChange={(e) => {
                  setChatText(e.target.value)
                }}
                onKeyUp={handleKeyPress}
              />
              <button
                className='text-blue-700 text-2xl mr-4'
                onClick={handleSendText}
              >
                <AiOutlineSend />
              </button>
            </div>
            {imoticon && (
              <div className='flex relative '>
                <h1 className='mx-4 text-lg absolute bottom-16 left-10'>
                  원하는 이모티콘을 더블클릭 하세요!
                </h1>
                <h1
                  className='mx-4 text-4xl absolute bottom-14 cursor-pointer border-b-2 border-l-2 border-r-2'
                  style={{ left: '-10px' }}
                  ref={myImoticonRef1}
                  onClick={() => {
                    if (myImoticonRef1.current) {
                      setMyImoticonText(
                        myImoticonRef1.current.textContent || ''
                      )
                      handlePlaceholderText()
                    }
                  }}
                  onDoubleClick={handleImoticonText}
                >
                  {`😘`}
                </h1>
                <h1
                  className='mx-4 text-4xl absolute bottom-24 cursor-pointer border-l-2 border-r-2'
                  style={{ left: '-10px' }}
                  ref={myImoticonRef2}
                  onClick={() => {
                    if (myImoticonRef2.current) {
                      setMyImoticonText(
                        myImoticonRef2.current.textContent || ''
                      )
                      handlePlaceholderText()
                    }
                  }}
                  onDoubleClick={handleImoticonText}
                >
                  {`🤔`}
                </h1>
                <h1
                  className='mx-4 text-4xl absolute cursor-pointer border-t-2 border-l-2 border-r-2'
                  style={{ bottom: '135px', left: '-10px' }}
                  ref={myImoticonRef3}
                  onClick={() => {
                    if (myImoticonRef3.current) {
                      setMyImoticonText(
                        myImoticonRef3.current.textContent || ''
                      )
                      handlePlaceholderText()
                    }
                  }}
                  onDoubleClick={handleImoticonText}
                >
                  {`😐`}
                </h1>
              </div>
            )}
          </div>
          <div className='flex flex-col text-center absolute top-24 right-64 text-2xl font-main'>
            <h1>S를 5번 누르면 디버그 모드에 진입합니다</h1>
            <h1 className='mt-4'>4 입력시 ToDo List를</h1>
            <h1 className='mt-4'>8 입력시 카카오맵API를</h1>
            <h1 className='mt-4'>바로 확인해보실 수 있습니다</h1>
          </div>
        </motion.div>
      )}
    </div>
  )
}
