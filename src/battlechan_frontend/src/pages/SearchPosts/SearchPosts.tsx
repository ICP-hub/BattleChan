import { useSearchParams } from "react-router-dom";
import MainPosts from "../MainPosts/MainPosts";
import { useEffect, useState } from "react";
import PostApiHanlder from "../../API_Handlers/post";
type Theme = {
  handleThemeSwitch: Function;
};

interface SearchPost {
  upvotes: string;
  postName: string;
  upvotedBy: string[];
  postDes: string;
  createdAt: string;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  updatedAt: string[];
  expireAt: string;
  postMetaData: Int8Array;
  board: string;
  downvotes: string;
  downvotedBy: string[];
  postId: string;
}

type PostInfo = {
  postId: string;
  postName: string;
  postMetaData: Int8Array;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  upvotes: number;
};

const SearchPosts = (props: Theme) => {
  const [searchPosts, setSearchPosts] = useState<PostInfo[]>([]);
  const [searchParams] = useSearchParams();
  const searchInput = searchParams.get("searchInput");
  const { getSearchPost } = PostApiHanlder();

  useEffect(() => {
    const fetchSearchPosts = async () => {
      try {
        if (searchInput) {
          console.log("search Input: ", searchInput);
          const res = (await getSearchPost(searchInput ?? "")) as PostInfo[];
          console.log("search response: ", res);
          setSearchPosts(res);
        }
      } catch (error) {
        console.log("Search Error: ", error);
      }
    };
    fetchSearchPosts();
  }, []);

  return (
    <MainPosts
      handleThemeSwitch={props.handleThemeSwitch}
      type="searchPosts"
      searchPosts={searchPosts}
    />
  );
};

export default SearchPosts;
