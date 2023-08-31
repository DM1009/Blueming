import React from 'react'
import TodoApp from './todo'
import { AiFillCloseCircle } from 'react-icons/ai'
interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  stage: number
  setStage: React.Dispatch<React.SetStateAction<number>>
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  stage,
  setStage,
}) => {
  if (!isOpen || stage < 3 || stage >= 5) return null

  const handleTodoChange = (todoCount: number) => {
    if (todoCount === 0) {
      !isOpen
      setStage(6) // Todo 리스트가 없는 경우 stage를 5로 변경
    }
    console.log(stage)
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <TodoApp onTodoChange={handleTodoChange} />
        <button
          className='close-button text-3xl text-red-500'
          onClick={closeModal}
        >
          <AiFillCloseCircle />
        </button>
      </div>
    </div>
  )
}

export default Modal
