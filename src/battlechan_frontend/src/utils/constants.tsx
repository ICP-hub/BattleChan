
const Constant = () => {

  // Get All COmments of post
  const getAllComments = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfPost(postId, 10, 1);
      console.log("allCommentOfPost: ", res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Returns
  return { getAllComments };
};

export default Constant;
