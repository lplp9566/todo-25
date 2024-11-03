import React from 'react'
import { useGlobalTodo } from '../../context/todoContext'
import { Todo } from '../../types/types'
import TodoCard from '../TodoCard/TodoCard'

const TodosContaner = () => {
    const {getFromLocalStorage}= useGlobalTodo()
    const todos:Todo[] = getFromLocalStorage()
  return (
<div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <TodoCard todo = {todo}/>
          </div>
        );
      })}
    </div>
  )
}

export default TodosContaner