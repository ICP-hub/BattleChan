import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import PostApiHanlder from "../../../API_Handlers/post";

interface Post {
  postId: string;
  postName: string;
}

interface PostInfo {
  postId: string;
  postName: string;
}

interface BackendResponse {
  archivedPost: PostInfo[];
  activePost: PostInfo[];
}

type SearchResults = BackendResponse;

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<SearchResults>>;
  setIsSearchListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults, setIsSearchListVisible,setIsLoading }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const { getSearchPost } = PostApiHanlder();

  async function fetchSearchData(value: string) {
    try {
      setIsLoading(true); 

      const response = (await getSearchPost(value)) as BackendResponse;
      console.log({ response });

      setResults(response);
      setIsSearchListVisible(true); // Show search list when results are fetched
    } catch (error) {
      console.error("Error fetching search data:", error);
      setResults({ activePost: [], archivedPost: [] });
      setIsSearchListVisible(false); // Hide search list if there's an error
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <div className="input relative flex-row-center text-[#767676] laptop:flex hidden">
      <IoSearch className={`absolute text-3xl ml-4 p-1`} />

      <input
        type="text"
        name="search"
        placeholder="Search here...."
        id="postsearch"
        className={`rounded-[2rem] xl:w-[400px] pl-14 px-8 py-3.5 text-lg font-normal text-dark dark:text-light dark:bg-dark border border-light dark:focus:outline dark:focus:outline-light`}
        value={searchInput}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
          if (value.trim() !== "") {
            fetchSearchData(value);
          } else {
            setResults({ activePost: [], archivedPost: [] });
            setIsSearchListVisible(false); // Hide search list if input is empty
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
