import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { LikedPost, Post, PostCategory } from "./posts.type";
import {
  getPosts,
  getPostsCategories,
  getPostsLiked,
  sendDisslikedPost,
  sendLikedPost,
  sendPostViewed,
} from "../api/posts.api";

export interface PostsStore {
  posts: Post[];
  postsForView: Post[];
  categories: PostCategory[];
  likedPosts: LikedPost[];
  postInProcessing: string;
  loading: boolean;
  likeLoading: boolean;
  fetchPosts: (force?: boolean) => void;
  fetchPostsCategory: (force?: boolean) => void;
  fetchLikedPosts: (force?: boolean) => void;
  filterPosts: (tagId?: string | null) => void;
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
        likeLoading: false,
        postInProcessing: "",
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

          const likedPosts = await getPostsLiked();

          set(() => ({
            likedPosts,
            loading: false,
          }));
        },
        filterPosts: (tagId?: string | null) => {
          const posts = get().posts;

          if (!tagId) {
            set(() => ({
              postsForView: posts,
            }));
            return;
          }

          const filteredPosts = posts.filter((post) => post.tagId === tagId);

          set(() => ({
            postsForView: filteredPosts,
          }));
        },
        likePost: async (postId: string) => {
          try {
            set(() => ({ likeLoading: true, postInProcessing: postId }));
            await sendLikedPost(postId);
            set(() => ({ likeLoading: false, postInProcessing: postId }));
          } catch (error) {
            console.log(error);
            set(() => ({ likeLoading: false, postInProcessing: postId }));
          }
        },
        disslikePost: async (postId: string) => {
          try {
            const likedPosts = get().likedPosts;
            const likedPost = likedPosts.find(
              (post) => post.inititalId === postId
            );

            if (!likedPost) {
              return;
            }
            set(() => ({ likeLoading: true, postInProcessing: postId }));
            await sendDisslikedPost(likedPost.id, likedPost.inititalId);
            set(() => ({ likeLoading: false, postInProcessing: postId }));
          } catch (error) {
            console.error(error);
            set(() => ({ likeLoading: false, postInProcessing: postId }));
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

          sendPostViewed(postId);
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
