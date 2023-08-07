import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { LikedPost, Post, PostCategory } from "./posts.type";
import {
  getPosts,
  getPostsCategories,
  getPostsLiked,
  sendDisslikedPost,
  sendLikedPost,
} from "../api/posts.api";

export interface PostsStore {
  posts: Post[];
  postsForView: Post[];
  categories: PostCategory[];
  likedPosts: LikedPost[];
  loading: boolean;
  fetchPosts: (force?: boolean) => void;
  fetchPostsCategory: (force?: boolean) => void;
  fetchLikedPosts: (force?: boolean) => void;
  filterPosts: (tagId?: string[]) => void;
  likePost: (postId: string) => void;
  disslikePost: (postId: string) => void;
  savePost: (post: Post) => void;
  clearPost: () => void;
  getPost: () => Post;
  setPostReaded: (postId: string) => void;
  getPostReaded: () => string[];
}

export const usePostsStore = create<PostsStore>()(
  devtools(
    persist(
      (set, get) => ({
        posts: [],
        postsForView: [],
        categories: [],
        likedPosts: [],
        loading: false,
        fetchPosts: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedPosts = get().posts;
          const hasCachedPosts = Boolean(cachedPosts && cachedPosts.length);

          const posts =
            hasCachedPosts && !force ? cachedPosts : await getPosts();

          set(() => ({
            posts,
            postsForView: posts,
            loading: false,
          }));
        },
        fetchPostsCategory: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedCategories = get().categories;

          const hasCachedCategories = Boolean(
            cachedCategories && cachedCategories.length
          );

          const categories =
            hasCachedCategories && !force
              ? cachedCategories
              : await getPostsCategories();

          set(() => ({
            categories,
            loading: false,
          }));
        },
        fetchLikedPosts: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedLikedPosts = get().likedPosts;

          const hasCachedLiked = Boolean(
            cachedLikedPosts && cachedLikedPosts.length
          );

          const likedPosts =
            hasCachedLiked && !force ? cachedLikedPosts : await getPostsLiked();

          set(() => ({
            likedPosts,
            loading: false,
          }));
        },
        filterPosts: (tagIds?: string[]) => {
          const posts = get().posts;

          console.log(tagIds);
          if (!tagIds) {
            set(() => ({
              postsForView: posts,
            }));
            return;
          }

          const filteredPosts = posts.filter((post) =>
            tagIds.includes(post.tagId)
          );

          set(() => ({
            postsForView: filteredPosts,
          }));
        },
        likePost: async (postId: string) => {
          try {
            set(() => ({ loading: true }));
            await sendLikedPost(postId);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
        disslikePost: async (postId: string) => {
          try {
            set(() => ({ loading: true }));
            await sendDisslikedPost(postId);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
        savePost: (post: Post) => {
          window.localStorage.setItem("post", JSON.stringify(post));
        },
        clearPost: () => {
          window.localStorage.removeItem("post");
        },
        getPost: () => {
          const post = window.localStorage.getItem("post");

          if (!post) {
            return null;
          }

          return JSON.parse(post);
        },
        setPostReaded: (postId: string) => {
          const readedPosts = JSON.parse(
            window.localStorage.getItem("readed-posts") || "[]"
          );
          window.localStorage.setItem(
            "readed-posts",
            JSON.stringify([...readedPosts, postId])
          );
        },
        getPostReaded: () => {
          const readedPosts = JSON.parse(
            window.localStorage.getItem("readed-posts") || "[]"
          );

          return readedPosts;
        },
      }),
      {
        name: "posts",
        partialize: (state) => ({
          posts: state.posts,
          categories: state.categories,
          likedPosts: state.likedPosts,
        }),
      }
    )
  )
);
