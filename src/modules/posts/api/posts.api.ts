import { Collections } from "@app/constants/collections";
import {
  createDocumentWithAutoID,
  deleteDocument,
  getSnapshotCollection,
  pushData,
} from "@/modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { LikedPost, Post, PostCategory } from "../store/posts.type";
import { orderBy } from "firebase/firestore";

import { getFunctions, httpsCallable } from "firebase/functions";
import { CloudFunctionsRoutes } from "@/app/constants/cloud-functions";

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
  try {
    const eventId = getEventId();

    const callPostAction = httpsCallable(
      getFunctions(),
      CloudFunctionsRoutes.ADD_ARTICLE_ACTION
    );

    await Promise.all([
      await createDocumentWithAutoID(
        Collections.EVENTS,
        [eventId, Collections.POSTS_LIKED],
        {
          inititalId: postId,
        }
      ),
      await callPostAction({ articleId: postId, action: "favourite" }),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const sendDisslikedPost = async (
  documentId: string,
  postId: string
): Promise<void> => {
  try {
    const eventId = getEventId();

    const callPostAction = httpsCallable(
      getFunctions(),
      CloudFunctionsRoutes.ADD_ARTICLE_ACTION
    );

    await Promise.all([
      await deleteDocument(Collections.EVENTS, [
        eventId,
        Collections.POSTS_LIKED,
        documentId,
      ]),

      await callPostAction({ articleId: postId, action: "-favourite" }),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const sendPostViewed = async (postId: string): Promise<void> => {
  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_ARTICLE_ACTION
  );

  await callPostAction({ articleId: postId, action: "view" });
};
