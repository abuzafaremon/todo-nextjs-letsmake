import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoLists = localStorage.getItem('todos')
    if (todoLists) {
      setTodos(JSON.parse(todoLists))
    }
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    const todoText = e.target.todo.value;
    const allTodo = [{ todoText: todoText, id: Date.now(), completed: false }, ...todos]
    if (!todoText) {

    } else {
      setTodos(allTodo)
      localStorage.setItem('todos', JSON.stringify(allTodo))
      e.target.todo.value = '';
    }
  }

  const handleComplete = (id) => {
    let newTodoList = todos.filter(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo
    })
    setTodos(newTodoList)
    localStorage.setItem('todos', JSON.stringify(newTodoList))
  }

  const deleteTodo = (id) => {
    const remainTodos = todos.filter((todo) => todo.id !== id);

    setTodos(remainTodos);
    localStorage.setItem('todos', JSON.stringify(remainTodos))
  }

  const clearCompleted = () => {
    let newTodoList = todos.filter(todo => {
      if (!todo.completed) return todo
    })
    setTodos(newTodoList);
    localStorage.setItem('todos', JSON.stringify(newTodoList))
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
              todos?.slice(0, 5).map(({ id, completed, todoText }) => <div key={id} style={{ background: completed && "green" }} className="todo">
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