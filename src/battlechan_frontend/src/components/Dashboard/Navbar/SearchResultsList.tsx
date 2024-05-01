import React from "react";
import { Link } from "react-router-dom";

interface Post {
  postId: string;
  postName: string;
}

interface SearchResultsListProps {
  results: Post[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <>
      <div className="bg-light dark:bg-dark dark:bg-opacity-100 text-dark dark:text-light dark:border dark:border-light absolute left-0 right-0 rounded-xl mt-2 p-2 font-normal">
        <div
          className={`overflow-y-scroll max-h-52 ${
            results.length <= 6 ? "no-scrollbar" : ""
          }`}
        >
          {results.map((post) => (
            <Link
              key={post.postId}
              to={`/dashboard/postDetails/${encodeURIComponent(post.postId)}`}
            >
              <div
                key={post.postId}
                className="hover:bg-grey dark:hover:bg-green px-2 py-1 rounded-lg mr-2"
              >
                {post.postName}
              </div>
            </Link>
          ))}

          {results.map((post) => (
            <Link
              key={post.postId}
              to={`/dashboard/postDetails/${encodeURIComponent(
                post.postId
              )}?type=archive`}
            >
              <div
                key={post.postId}
                className="hover:bg-grey dark:hover:bg-green px-2 py-1 rounded-lg mr-2"
              >
                {post.postName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResultsList;
