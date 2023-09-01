import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface EndProps {
  stage: number
}

export default function End({ stage }: EndProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleMusic = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const audio = new Audio('/assets/bgm/5.mp3')
    audio.crossOrigin = 'anonymous'

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
      context.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      dataArray.forEach((value) => {
        const barHeight = (value / 256) * canvas.height
        context.fillStyle = `rgba(0,100,${value + 100},0.5)`
        context.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      })

      requestAnimationFrame(drawSpectrum)
    }

    audio.addEventListener('canplay', () => {
      audio.play()
      drawSpectrum()
    })
  }
  useEffect(() => {
    if (stage === 11) {
      handleMusic()
    }
  }, [stage])

  return (
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
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <Image
            className='md:w-2/5 xl:w-1/5 w-full flex flex-col justify-center border-2 mx-auto rounded-2xl absolute top-0 opacity-50 main'
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
              style={{ zIndex: 2 }}
            />
          </div>

          <div className='flex justify-center items-center'>
            <canvas
              style={{ zIndex: 1 }}
              ref={canvasRef}
              width={300}
              height={50}
            ></canvas>
          </div>
        </motion.div>
        <div className='flex justify-center text-center'>
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 2, duration: 1 }}
            style={{ zIndex: 4 }}
          >
            <Link href={'/main'}>
              <h1 className='mt-4 text-3xl cursor-pointer text-with-stroke my-custom-font1'>
                다시 하기
              </h1>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
