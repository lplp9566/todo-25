import React, { FC } from 'react'
import { useGlobalTodo } from '../../context/todoContext'


const FromInput:FC = () => {
  const {addTodo} =useGlobalTodo()
  const handleSubmit= (e:any)=>{
    e.preventDefault()
    addTodo(e.target.elements.description.value)
  }

  return (
    <div>
      <form className='From' onSubmit={handleSubmit} >
        <input type="text" name ="description"/>
        <button type='submit'>send</button>
      </form>
    </div>
  )
}

export default FromInput