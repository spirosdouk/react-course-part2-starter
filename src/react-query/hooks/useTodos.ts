import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }
  
  const todoApiClient = new ApiClient('https://jsonplaceholder.typicode.com/todos');

  export const useTodosApi = () => {
    const queryClient = useQueryClient();
  
    const fetchTodos = async () => {
      return await todoApiClient.getAll<Todo>();
    };
  
    const createTodo = async (todo: Todo) => {
      return await todoApiClient.post<Todo>(todo);
    };
  
    const todosQuery = useQuery(['todos'], fetchTodos);
  
    const createTodoMutation = useMutation(createTodo, {
      onSuccess: (savedTodo) => {
        queryClient.setQueriesData<Todo[]>(['todos'], (todos) => [
          savedTodo,
          ...(todos || []),
        ]);
      },
    });
  
    return { todosQuery, createTodoMutation };
  };