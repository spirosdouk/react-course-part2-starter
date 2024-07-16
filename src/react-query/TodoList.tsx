import { useTodosApi } from "./hooks/useTodos";
import { Todo } from "./hooks/useTodos";
const TodoList = () => {
  const { todosQuery } = useTodosApi();
  const { data: todos, error, isLoading } = todosQuery;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo: Todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
