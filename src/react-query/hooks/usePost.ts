import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery{
    page: number
    pageSize: number
    userId?: number | null; 
}

export const usePost = (query:PostQuery) => {
  const fetchPosts = async () => {
    const { page, pageSize, userId } = query;
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}${userId ? `&userId=${userId}` : ""}`;
      const response = await axios.get<Post[]>(url);
    return response.data;
  };

  return useQuery<Post[], Error>(["posts", query], fetchPosts);
};

export default usePost;