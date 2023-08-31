import React, { useState } from 'react'
import { FcDeleteDatabase } from 'react-icons/fc'
import { AiFillPlusCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

interface Todo {
  id: number
  text: string
  done: boolean
}

const TodoItem: React.FC<{ todo: Todo; toggleTodo: (id: number) => void }> = ({
  todo,
  toggleTodo,
}) => {
  return (
    <li>
      <input
        className='mx-4'
        type='checkbox'
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.done ? 'done' : ''}>{todo.text}</span>
    </li>
  )
}

const TodoList: React.FC<{
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <div key={todo.id} className='todo-item flex justify-center my-2'>
          <TodoItem todo={todo} toggleTodo={toggleTodo} />
          <button className='mx-4 text-2xl' onClick={() => deleteTodo(todo.id)}>
            <FcDeleteDatabase />
          </button>
        </div>
      ))}
    </ul>
  )
}

const TodoApp: React.FC<{ onTodoChange: (todoCount: number) => void }> = ({
  onTodoChange,
}) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'REACT 공부하기', done: false },
    { id: 2, text: '취직 준비하기', done: false },
    { id: 3, text: '면접 보기', done: false },
  ])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (text.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text, done: false }])
      setText('')
      onTodoChange(todos.length + 1)
    }
  }

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    onTodoChange(todos.length - 1) // Todo 개수 변경 시 onTodoChange 호출
  }
  return (
    <div className=' bg-emerald-200 rounded-2xl p-5'>
      <h1>할 일!</h1>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 1,
          ease: 'backInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <h1>(Todo 리스트를 모두 지워 보세요!)</h1>
      </motion.div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div className='flex flex-col justify-center items-center mt-8'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a new task'
        />
        <button className='text-3xl mt-4' onClick={addTodo}>
          <AiFillPlusCircle />
        </button>
      </div>
      <style jsx>{`
        .done {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  )
}

export default TodoApp
