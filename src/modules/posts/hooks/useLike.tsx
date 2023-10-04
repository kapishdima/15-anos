import { isPostLiked } from "../store/posts.selector";
import { usePostsStore } from "../store/posts.store";

export const useLike = (postId: string) => {
  const loading = usePostsStore((state) => state.likeLoading);
  const liked = usePostsStore((state) => isPostLiked(postId, state));
  console.log("liked", liked);
  const sendLikedPost = usePostsStore((state) => state.likePost);
  const sendDisslikedPost = usePostsStore((state) => state.disslikePost);

  const fetchLikedPosts = usePostsStore((state) => state.fetchLikedPosts);

  const likePost = async () => {
    await sendLikedPost(postId);
    fetchLikedPosts(/*force*/ true);
  };

  const disslikePost = async () => {
    await sendDisslikedPost(postId);
    fetchLikedPosts(/*force*/ true);
  };

  return {
    liked,
    loading,
    likePost,
    disslikePost,
  };
};
