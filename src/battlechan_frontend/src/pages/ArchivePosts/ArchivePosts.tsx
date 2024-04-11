import MainPosts from "../MainPosts/MainPosts";
type Theme = {
  handleThemeSwitch: Function;
};

const ArchivePosts = (props: Theme) => {
  return (
    <MainPosts handleThemeSwitch={props.handleThemeSwitch} type="archive" />
  );
};

export default ArchivePosts;
