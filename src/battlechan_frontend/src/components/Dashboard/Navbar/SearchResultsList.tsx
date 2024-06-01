import React from "react";
import { Link } from "react-router-dom";

interface Post {
  postId: string;
  postName: string;
}

interface SearchResultsListProps {
  setResults: any;
  activePost: Post[];
  archivedPost: Post[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  setResults,
  activePost,
  archivedPost,
}) => {
  return (
    <div className="bg-light absolute left-0 right-0 z-10 tablet:top-[8vh] top-[6vh] dark:bg-dark dark:bg-opacity-100 text-dark dark:text-light dark:border dark:border-light rounded-xl mt-2 p-2 font-normal">
      <div
        className={`overflow-y-scroll max-h-52 ${
          activePost.length + archivedPost.length <= 6 ? "no-scrollbar" : ""
        }`}
      >
        {activePost.map((post: any) => (
          <Link
            key={post.postId}
            to={`/dashboard/postDetails/${encodeURIComponent(post.postId)}`}
            onClick={() => {
              setTimeout(() => {
                setResults({ activePost: [], archivedPost: [] });
              }, 1000);
            }}
          >
            <div
              key={post.postId}
              className="hover:bg-grey dark:hover:bg-green px-2 py-1 rounded-lg mr-2"
            >
              {post.postName}
            </div>
          </Link>
        ))}

        {archivedPost.map((post: any) => (
          <Link
            key={post.postId}
            to={`/dashboard/postDetails/${encodeURIComponent(
              post.postId
            )}?type=archive`}
            onClick={() => {
              setTimeout(() => {
                setResults({ activePost: [], archivedPost: [] });
              }, 1000);
            }}
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
  );
};

export default SearchResultsList;
