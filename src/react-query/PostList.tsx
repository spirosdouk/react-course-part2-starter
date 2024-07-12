import { useState } from "react";
import usePost from "./hooks/usePost";

const PostList = () => {
  const [selUser, setSelUser] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, error, isLoading } = usePost({
    page,
    pageSize,
    userId: selUser,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value ? parseInt(event.target.value) : null;
    setSelUser(userId);
  };

  return (
    <>
      <select className="form-select mb-3" onChange={handleUserChange}>
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        className="btn btn-primary"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
        Next
      </button>
    </>
  );
};

export default PostList;
