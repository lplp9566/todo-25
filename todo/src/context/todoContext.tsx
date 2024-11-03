import { v4 as uuid } from "uuid";
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
  addTodo: (description: string) => void;
  getFromLocalStorage: () => Todo[];
  updateTodo: (id: string, todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<ContextProps>({
  addTodo: () => {},
  getFromLocalStorage: () => [],
  updateTodo: () => {},
  deleteTodo: () => {},
});

const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [tods, settodos] = useState<Todo[]>([]);

  // שליפת todos פעם אחת מה-localStorage בתחילת טעינת הקומפוננטה
  useEffect(() => {
    const todosFromStorage = getFromLocalStorage();
    settodos(todosFromStorage);
  }, []);

  
  const getFromLocalStorage = (): Todo[] => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  
  const addTodo = (description: string) => {
    const newTodo: Todo = {
      _id: uuid(),
      description,
      completed: false,
    };
    const updatedTodos = [...tods, newTodo];
    settodos(updatedTodos);
    saveToLocalStorage(updatedTodos); 
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    const newToDoList = tods.map((t) => (t._id === id ? updatedTodo : t));
    settodos(newToDoList);
    saveToLocalStorage(newToDoList);
  };


  const deleteTodo = (id: string) => {
    const newToDoList = tods.filter((t) => t._id !== id);
    settodos(newToDoList);
    saveToLocalStorage(newToDoList);
  };

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        getFromLocalStorage,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useGlobalTodo = () => {
  return useContext(TodoContext);
};

export { TodoContext, TodoProvider };
