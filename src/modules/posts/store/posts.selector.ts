import { PostsStore } from "./posts.store";

export const isPostLiked = (id: string, state: PostsStore) => {
  return state.likedPosts.find((post) => post.initialId === id);
};
