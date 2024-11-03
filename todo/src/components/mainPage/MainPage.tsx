import React, { FC } from 'react'
import TodosContaner from '../TodosContaner/TodosContaner'
import FromInput from '../FormInput/FormInput'


const MainPage :FC= () => {
  return (
    <div>
        <FromInput/>

        <TodosContaner/>
        
    </div>
  )
}

export default MainPage