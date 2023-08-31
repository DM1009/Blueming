import React, { useEffect, useRef, useState } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import { AiOutlineSend } from 'react-icons/ai'
import { RiCalendarTodoFill } from 'react-icons/ri'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Talk from '@/components/talk'
import Modal from '@/components/modal'

interface HomeProps {}

export default function Home(props: HomeProps): JSX.Element {
  const [chatText, setChatText] = useState<string>('')
  const [stage, setStage] = useState<number>(0)
  const [imoticon, setImoticon] = useState<boolean>(false)
  const [myImoticonText, setMyImoticonText] = useState<string>(``)
  const myImoticonRef1 = useRef<HTMLHeadingElement>(null)
  const myImoticonRef2 = useRef<HTMLHeadingElement>(null)
  const myImoticonRef3 = useRef<HTMLHeadingElement>(null)
  const [placeholderText, setPlaceholderText] =
    useState<string>(`뭐해? 라고 입력해보세요!`)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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
    if (stage === 1) {
      const audio = new Audio('/assets/bgm/1.mp3')
      audio.play()
      setTimeout(() => {
        setStage(2)
        console.log(stage)
      }, 8500)
    }
    if (stage === 2) {
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
      }, 11000)
    }
    if (stage === 7) {
      const audio = new Audio('/assets/bgm/4.mp3')
      audio.play()
      setTimeout(() => {
        console.log(stage)
        setStage(8)
      }, 2000)
    }
  }, [stage])

  return (
    <div
      className='md:w-2/5 xl:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl'
      style={{ height: '100vh' }}
    >
      <div
        className='flex justify-between bg-blue-500 rounded-t-xl'
        style={{ height: '5vh' }}
      >
        <button className='text-xl ml-4 font-extrabold text-white'>
          <FaArrowLeft />
        </button>
        <h1 className='text-xl my-auto text-white font-bold'>S</h1>
        {stage === 4 ? (
          <motion.div
            animate={{
              y: [7, 7],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 1,
              ease: 'backInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <button className='text-xl mr-4 text-white' onClick={openModal}>
              <RiCalendarTodoFill />
            </button>
          </motion.div>
        ) : (
          <button className='text-xl mr-4 text-white'>
            <RiCalendarTodoFill />
          </button>
        )}
      </div>
      <div
        className='bg-white justify-center text-center'
        style={{ height: '90vh' }}
      >
        {stage < 8 ? (
          <div>
            {' '}
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
      </div>
      <div
        className='flex flex-row justify-between my-auto border-2 rounded-b-xl border-blue-500'
        style={{ height: '5vh' }}
      >
        {stage === 2 ? (
          <button
            className='text-blue-700 text-2xl ml-4'
            onClick={handleImoticon}
          >
            <motion.div
              animate={{
                scale: [1, 1.5],
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
          className='my-auto text-xl mx-4 px-4 bg-blue-100 rounded-md'
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
          <h1
            className='mx-4 text-4xl absolute bottom-10 cursor-pointer border-b-2 border-l-2 border-r-2'
            style={{ left: '-10px' }}
            ref={myImoticonRef1}
            onClick={() => {
              if (myImoticonRef1.current) {
                setMyImoticonText(myImoticonRef1.current.textContent || '')
                handlePlaceholderText()
              }
            }}
            onDoubleClick={handleImoticonText}
          >
            {`😘`}
          </h1>
          <h1
            className='mx-4 text-4xl absolute bottom-20 cursor-pointer border-l-2 border-r-2'
            style={{ left: '-10px' }}
            ref={myImoticonRef2}
            onClick={() => {
              if (myImoticonRef2.current) {
                setMyImoticonText(myImoticonRef2.current.textContent || '')
                handlePlaceholderText()
              }
            }}
            onDoubleClick={handleImoticonText}
          >
            {`🤔`}
          </h1>
          <h1
            className='mx-4 text-4xl absolute cursor-pointer border-t-2 border-l-2 border-r-2'
            style={{ bottom: '120px', left: '-10px' }}
            ref={myImoticonRef3}
            onClick={() => {
              if (myImoticonRef3.current) {
                setMyImoticonText(myImoticonRef3.current.textContent || '')
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
  )
}
