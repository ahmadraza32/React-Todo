import React from 'react'
import Todo from './Todo'

export default function Todos({todos, toggleTodo}) {
  return (
    <div>
        {
            todos.map(todo => {
                return <Todo todo={todo} toggleTodo={toggleTodo} key={todo} />
            })
        }
    </div>
  )
}
