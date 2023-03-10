import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const TodoDetails = () => {
  const getTodos = () => {
    let todoLists;
    if (typeof window !== 'undefined') {
      todoLists = localStorage.getItem('todos')
    }
    if (todoLists) {
      return JSON.parse(localStorage.getItem('todos'))
    } else {
      return []
    }
  }
  const [todos, setTodos] = useState(getTodos());
  const router = useRouter();
  const id = router.query.todoDetail;
  const todo = todos?.find(todo => todo.id == id)
  return (
    <div className="main-div">
      <div className="todo-details">
        <h3>Todo Id: {todo?.id}</h3>
        <p>{todo?.todoText}</p>
        <Link href='/'>Back</Link>
      </div>
    </div>
  );
};

export default TodoDetails;