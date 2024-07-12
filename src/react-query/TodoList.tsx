import useTodos, { Todo } from "./hooks/useTodos";

const TodoList = () => {
  const { data: todos, error } = useTodos();

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
