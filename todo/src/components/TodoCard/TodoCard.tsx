import React from 'react'
import "./TodoCard.css"
import { Todo } from '../../types/types'
import { useGlobalTodo } from '../../context/todoContext'
interface todoProps {
todo:Todo
}
const TodoCard:React.FC<todoProps> = ({todo}) => {
    const {deleteTodo,updateTodo} = useGlobalTodo()
    const { _id, description, completed } = todo

  return (
    <div>
     <li className={`todo-item ${todo.completed ? "completed" : ""} `}>
      <div className="todo-status-and-text" >
      <button onClick={() => updateTodo(_id!, {_id, description, completed: !completed })}>{!completed ? "❌" : "✔️"}</button>

        <span className='description'>{todo.description}</span>
      </div>
      <button className='delete'  onClick={()=>deleteTodo(todo._id!)}>Delete</button>
    </li>
    </div>
  )
}

export default TodoCard