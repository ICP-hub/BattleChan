import React from "react";

const KnowMore = () => {
  return (
    <div className="KnowMoreAboutPosts pt-12 pb-40">
      <h1 className="text-3xl font-semibold text-center p-8">
        Know More About Posts
      </h1>

      <ul className="list-disc px-[25vw]">
        <li>
          Posting is free, and it grants 5 minutes of visibility to each new
          post.
        </li>
        <li>
          Each Post has a countdown timer, when $TIME reaches zero, your post
          will be archived.
        </li>
        <li>Users can use $TIME tokens to upvote or downvote on your posts.</li>
        <li>
          You can withdraw $TIME tokens from your own post, Which potentially
          reduces its visibility.
        </li>
      </ul>
    </div>
  );
};

export default KnowMore;
