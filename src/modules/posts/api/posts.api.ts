import { Collections } from "@app/constants/collections";
import {
  deleteDocument,
  getSnapshotCollection,
  pushData,
} from "@modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { LikedPost, Post, PostCategory } from "../store/posts.type";
import { orderBy } from "firebase/firestore";

export const getPosts = async (): Promise<Post[]> => {
  const posts = await getSnapshotCollection<Post[]>(
    Collections.POSTS,
    [],
    [orderBy("popularity", "desc")]
  );

  if (!posts) {
    return [];
  }

  return posts;
};

export const getPostsCategories = async (): Promise<PostCategory[]> => {
  const postsCategories = await getSnapshotCollection<PostCategory[]>(
    Collections.POSTS_CATEGORY,
    [],
    [orderBy("number", "asc")]
  );

  if (!postsCategories) {
    return [];
  }

  return postsCategories;
};

export const getPostsLiked = async (): Promise<LikedPost[]> => {
  const eventId = getEventId();
  const likedPosts = await getSnapshotCollection<LikedPost[]>(
    Collections.EVENTS,
    [eventId, Collections.POSTS_LIKED]
  );

  console.log("likedPosts", likedPosts);

  if (!likedPosts) {
    return [];
  }

  return likedPosts;
};

export const sendLikedPost = async (postId: string): Promise<void> => {
  const eventId = getEventId();

  await pushData(Collections.EVENTS, [eventId, Collections.POSTS_LIKED], {
    inititalId: postId,
  });
};

export const sendDisslikedPost = async (postId: string): Promise<void> => {
  const eventId = getEventId();

  await deleteDocument(Collections.EVENTS, [
    eventId,
    Collections.POSTS_LIKED,
    postId,
  ]);
};
