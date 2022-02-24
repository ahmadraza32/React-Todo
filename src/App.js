import React,{useEffect, useRef, useState } from 'react'
import Todos from './components/Todos'

export default function App() {
  const [todos, setTodos] = useState([])
  const inputRef = useRef()

  function handleAddTodo(e){
    const name = inputRef.current.value
    if(name){
      setTodos(prev => {
        return [...prev, { id: Math.ceil(Date.now()), name, complete: false }]
      })

      inputRef.current.value = null
    }
  }

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem('key'))
    if(stored){
      setTodos(stored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(todos))
  }, [todos])

  function clearTodo(){
    let newTodos = todos.filter(todo => {
      return !todo.complete
    })
    setTodos(newTodos)
  }

  function toggleTodo(id){
    let newTodos = [...todos]
    let todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  return (
    <div>
      <h1>Todo List</h1>
      <Todos toggleTodo={toggleTodo} todos={todos} />
      <input ref={inputRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearTodo}>Clear</button>

      <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    </div>
  )
}
