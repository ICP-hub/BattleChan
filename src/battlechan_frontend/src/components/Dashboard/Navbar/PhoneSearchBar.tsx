import React from "react";
import { IoSearch } from "react-icons/io5";
import PostApiHanlder from "../../../API_Handlers/post";

interface Post {
  postId: string;
  postName: string;
}

type PostInfo = {
  postId: string;
  postName: string;
};

interface BackendResponse {
  status: boolean;
  archivedPost: PostInfo[];
  activePost: PostInfo[];
}

type SearchResults = Post[];

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<SearchResults>>;
  setShowSearchBarInPhone: Function;
}

const PhoneSearchBar: React.FC<SearchBarProps> = ({
  setResults,
  setShowSearchBarInPhone,
}) => {
  const [searchInput, setSearchInput] = React.useState("");
  const { getSearchPost } = PostApiHanlder();

  async function fetchSearchData(value: string) {
    let response;
    response = (await getSearchPost(value)) as BackendResponse;
    console.log(response);

    const results = data.filter((post) => {
      return (
        value &&
        post &&
        post.postName &&
        post.postName.toLowerCase().includes(value.toLowerCase())
      );
    });

    setResults(results);
  }

  return (
    <div className="input absolute top-0 tablet:left-0 left-[2px] flex-row-center text-[#767676] flex">
      <IoSearch
        className={`absolute small_phone:text-3xl text-2xl tablet:ml-4 ml-2 p-1`}
      />

      <input
        type="text"
        name="search"
        placeholder="Search here...."
        className={`rounded-[2rem] tablet:w-[300px] small_phone:w-[220px] w-[200px] tablet:pl-12 small_phone:pl-10 pl-8 tablet:py-3.5 small_phone:py-2.5 py-2 tablet:text-lg text-sm font-normal text-dark dark:text-light dark:bg-dark border border-light dark:focus:outline dark:focus:outline-light`}
        value={searchInput}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
          fetchSearchData(value);
        }}
        onBlur={() => {
          setResults([]);
          // setShowSearchBarInPhone(false);
        }}
      />
    </div>
  );
};

export default PhoneSearchBar;

const data: Post[] = [
  {
    postId: "1",
    postName: "Hello",
  },
  {
    postId: "2",
    postName: "Hello two",
  },
  {
    postId: "3",
    postName: "Hello three",
  },
  {
    postId: "4",
    postName: "Hello four",
  },
  {
    postId: "5",
    postName: "Hello five",
  },
  {
    postId: "6",
    postName: "Hello six",
  },
  {
    postId: "7",
    postName: "Hello seven",
  },
  {
    postId: "8",
    postName: "Hello eight",
  },
  {
    postId: "9",
    postName: "Hello nine",
  },
];
