import Link from "next/link";
import { useRouter } from "next/router";

const TodoDetails = () => {
  let allTodo;
  if (typeof window !== "undefined") {
    allTodo = JSON.parse(localStorage.getItem('todos'))
  }
  const router = useRouter();
  const id = router.query.todoDetail;
  const todo = allTodo?.find(todo => todo.id == id)
  return (
    <div className="main-div">
      <div className="todo-details">
        <h3>Todo Id: {todo?.id}</h3>
        <p>{todo?.todoText}</p>
        <p style={{ fontWeight: "bold" }}>Status : <span style={{ color: todo?.completed ? 'green' : "" }}>{todo?.completed ? "Completed" : "Incomplete"}</span></p>
        <Link href='/'>Back</Link>
      </div>
    </div>
  );
};

export default TodoDetails;