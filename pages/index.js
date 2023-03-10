import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const HomePage = () => {

  const getTodos = () => {
    if (typeof window !== 'undefined') {
      const todoLists = localStorage.getItem('todos')
      if (todoLists) {
        return JSON.parse(todoLists)
      } else {
        return []
      }
    }
  }
  const [todos, setTodos] = useState(getTodos);
  const addTodo = (e) => {
    e.preventDefault();
    const todoText = e.target.todo.value;
    if (!todoText) {

    } else {
      setTodos([{ todoText: todoText, id: Date.now(), completed: false }, ...todos])
      e.target.todo.value = '';
    }
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const handleComplete = (id) => {
    let newTodoList = todos.filter(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo
    })
    setTodos(newTodoList)
  }
  const deleteTodo = (id) => {
    const remainTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainTodos);
  }
  const clearCompleted = () => {
    let newTodoList = todos.filter(todo => {
      if (!todo.completed) return todo
    })
    setTodos(newTodoList)
  }
  return (
    <div className="main-div">
      <div className="todo-section">
        <h2>Lets Make Todo</h2>
        <div className="todo-div">
          <form className="todo-input" onSubmit={addTodo}>
            <input type="text" name="todo" id="todo" placeholder="Your Todo" required />
            <button type="submit" title="Add Todo">+</button>
          </form>
          <div className="all-todo">
            {
              todos?.map(({ id, completed, todoText }) => <div key={id} style={{ background: completed && "green" }} className="todo">
                <input onChange={() => handleComplete(id)} type="checkbox" name="completed" id="completed" checked={completed} />
                <Link href={`/${id}`}><p>{todoText}</p></Link>
                <button title="Delete Todo" onClick={() => deleteTodo(id)}>&#9003;</button>
              </div>)
            }
            <button onClick={clearCompleted} className="clear-btn">Clear Completed Todo</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage;