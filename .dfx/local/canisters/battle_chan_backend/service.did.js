export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat64,
    'title' : IDL.Text,
    'updated_at' : IDL.Nat64,
    'content' : IDL.Text,
    'image_url' : IDL.Text,
    'created_at' : IDL.Nat64,
    'author' : IDL.Text,
  });
  const AllPostsData = IDL.Record({
    'status' : IDL.Text,
    'data' : IDL.Vec(Post),
  });
  return IDL.Service({
    'create_post' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'get_posts' : IDL.Func([], [AllPostsData], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
