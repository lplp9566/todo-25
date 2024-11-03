import React from 'react'
import { Todo } from '../../types/types'
import { useGlobalTodo } from '../../context/todoContext'
interface todoProps {
todo:Todo
}
const TodoCard:React.FC<todoProps> = ({todo}) => {
    const {deleteTodo} = useGlobalTodo()
  return (
    <div>
     <li className={`todo-item ${todo.completed ? "completed" : ""} `}>
      <div className="todo-status-and-text" >
        <span>{todo.completed ? "✔️" : "❌"}</span>
        <span>{todo.description}</span>
      </div>
      <button onClick={()=>deleteTodo(todo._id!)}>Delete</button>
    </li>
    </div>
  )
}

export default TodoCard