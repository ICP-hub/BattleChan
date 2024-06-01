const KnowMore = () => {
  return (
    <div className="KnowMoreAboutPosts pt-12 pb-40">
      <h1 className="tablet:text-3xl text-2xl font-semibold text-center p-8">
        Know More About Posts
      </h1>

      <ul className="list-disc xl:px-[25vw] laptop:px-[20vw] tablet:px-[15vw] px-[10vw] dark:text-grey tablet:text-base text-sm flex flex-col tablet:gap-2 gap-4">
        <li>
          Posting is free, and it grants 30 minutes of visibility to each new
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
