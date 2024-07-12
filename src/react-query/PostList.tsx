import { useState } from "react";
import usePost, { Post } from "./hooks/usePost";

const PostList = () => {
  const [selUser, setSelUser] = useState<number | null>(null);
  const { posts, loading, error, hasMore, setPage } = usePost({
    userId: selUser,
  });

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value ? parseInt(event.target.value) : null;
    setSelUser(userId);
  };

  return (
    <>
      <select className="form-select mb-3" onChange={handleUserChange}>
        <option value="">Select a user</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="list-group">
        {posts.map((post: Post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={loading || !hasMore}
      >
        {loading ? "Loading more..." : hasMore ? "Load More" : "No more posts"}
      </button>
    </>
  );
};

export default PostList;
