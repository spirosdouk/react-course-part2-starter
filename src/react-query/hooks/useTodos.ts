import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

export const useTodos = () => {
    const fetchTodos = () =>
        axios
          .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
          .then((res) => res.data);
    return useQuery<Todo[], Error>({
        queryKey: ["todos", { completed: true }],
        queryFn: fetchTodos,
      });
}

export default useTodos