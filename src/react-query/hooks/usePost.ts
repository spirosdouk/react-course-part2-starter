import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId?: number | null;
}

export const usePost = (query: PostQuery) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10${query.userId ? `&userId=${query.userId}` : ""}`
      );
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (err) {
      setError('Failed to fetch posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, query.userId]);

  return { posts, loading, error, hasMore, setPage };
};

export default usePost;
