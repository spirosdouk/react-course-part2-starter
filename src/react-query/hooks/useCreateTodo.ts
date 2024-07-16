
import axios from "axios";
import { Todo } from "./useTodos"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const creatTodo = async (todo:Todo)=>{
    const response = await axios.post<Todo>("https://jsonplaceholder.typicode.com/todos",todo);
    return response.data
}

const useCreateTodo = () => {
  const queryClient=useQueryClient()

  return useMutation({
        mutationFn: creatTodo,
        onSuccess: (savedTodo, newTodo) => {
          queryClient.setQueriesData<Todo[]>(["todos"], (todos) => [
            savedTodo,
            ...(todos || []),
        ]);
    },
  });
};

export default useCreateTodo