import React from 'react'
import { motion } from 'framer-motion'

interface TalkProps {
  stage: number
  myImoticonText: string
  setStage: React.Dispatch<React.SetStateAction<number>>
}

const Talk: React.FC<TalkProps> = ({ stage, myImoticonText, setStage }) => {
  return (
    <div>
      <motion.div
        animate={{ opacity: stage === 7 ? [1, 0] : 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div>
          {stage >= 1 ? (
            <div className='flex justify-end mr-4 mt-4'>
              <motion.div
                animate={{
                  y: stage > 4 ? 0 : [10, 0],
                  opacity: stage > 4 ? 1 : [0, 1],
                }}
                transition={{
                  duration: stage > 4 ? 0 : 1,
                  ease: 'backInOut',
                }}
              >
                <h1
                  className={`text-white bg-blue-500 text-center w-24 h-8 rounded-2xl flex justify-center items-center `}
                >
                  뭐해?
                </h1>
              </motion.div>
              <motion.div
                className='absolute'
                animate={{
                  y: [50, 50, 50, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  delay: 3,
                  duration: 5,
                  ease: 'backInOut',
                  times: [0, 0.25, 0.5, 0.75],
                }}
              >
                <h1 className='font-extrabold'>네가 보고싶어</h1>
              </motion.div>
            </div>
          ) : (
            <></>
          )}
          {stage >= 3 ? (
            <div>
              <div className='flex justify-end mr-4 mt-4'>
                <motion.div
                  animate={{
                    y: stage > 4 ? 0 : [10, 0],
                    opacity: stage > 4 ? 1 : [0, 1],
                  }}
                  transition={{
                    duration: stage > 4 ? 0 : 1,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-white bg-blue-500 text-center w-24 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    {myImoticonText}
                  </h1>
                </motion.div>
              </div>
              <div className='flex flex-col justify-start mr-4 mt-4'>
                <motion.div
                  animate={{
                    y: [10, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 1,
                    delay: 2,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-blue-500 bg-white border-2 ml-4 text-center w-24 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    뭐야 ㅋㅋ
                  </h1>
                </motion.div>
                <motion.div
                  animate={{
                    y: stage > 4 ? 0 : [10, 0],
                    opacity: stage > 4 ? 1 : [0, 1],
                  }}
                  transition={{
                    duration: stage > 4 ? 0 : 1,
                    delay: 4,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-blue-500 bg-white border-2 ml-4 mt-4 text-center w-24 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    요새도 바빠?
                  </h1>
                </motion.div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {stage >= 6 ? (
            <>
              <div className='flex flex-col justify-start mr-4 mt-4'>
                <motion.div
                  animate={{
                    y: [10, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 1,
                    delay: 2,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-blue-500 bg-white border-2 ml-4 mt-4 text-center w-24 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    자나?
                  </h1>
                </motion.div>
              </div>

              <div className='flex justify-end mr-4 mt-4'>
                <motion.div
                  animate={{
                    y: [10, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    delay: 4,
                    duration: 1,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-white bg-blue-500 text-center w-36 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    아니! 안바빠! 안자!
                  </h1>
                </motion.div>
              </div>
              <div className='flex flex-col justify-start mr-4 mt-4'>
                <motion.div
                  animate={{
                    y: [10, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 1,
                    delay: 10,
                    ease: 'backInOut',
                  }}
                >
                  <h1
                    className={`text-blue-500 bg-white border-2 ml-4 text-center w-36 h-8 rounded-2xl flex justify-center items-center `}
                  >
                    친구들이랑 있어?
                  </h1>
                </motion.div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Talk
