import {v4 as uuid } from "uuid"
import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
import { Todo } from "../types/types";
  
  interface TodoProviderProps {
    children: ReactNode;
  }
  
  interface ContextProps {
    addTodo :(dscription:string)=>void;
    getFromLocalStorage :()=>Todo[];
    updateTodo:(id:string,todo:Todo)=>void;
    deleteTodo:(id:string)=>void;


  }
  
  const TodoContext = createContext<ContextProps>({
    addTodo :()=>{},
    getFromLocalStorage :()=>[],
    updateTodo:()=>{},
    deleteTodo:()=>{}
  });
  
  const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
    const [tods ,settodos] =useState<Todo[]>([])
    useEffect(()=>{
      saveToLOcalStotage(tods)
    },[tods])


    
  const getFromLocalStorage =()=>{
    const data = localStorage.getItem("todos")
    if (data){
      return JSON.parse(data)
    }
    else{
      return []
    }
  }
  const addTodo = (dscription:string)=>{
    const NewTodo:Todo ={
    _id:uuid(),
    description:dscription,
    completed:false

    }
   
    settodos([...tods,NewTodo])

  }

  const updateTodo = (id:string,todo:Todo)=>{
    let newToDoList = [...tods]
    newToDoList.map((t)=>{t._id ===id? t:todo})
    settodos (newToDoList)

    
  }
  const deleteTodo = (id:string)=>{
    let newToDoList = [...tods]
    newToDoList.splice(newToDoList.findIndex((t) => t._id === id), 1);
    settodos(newToDoList)

  }
    return (
      <TodoContext.Provider
        value={{
          addTodo,
          getFromLocalStorage,
          updateTodo,
          deleteTodo
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  };
  const saveToLOcalStotage =(tods:Todo[])=>{
    localStorage.setItem("todos",JSON.stringify(tods))
  }
  export const useGlobalTodo = () => {
    return useContext(TodoContext);
  };
  
  export { TodoContext, TodoProvider };
  



