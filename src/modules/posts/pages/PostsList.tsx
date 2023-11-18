import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AppLayout, PageHeader } from "@/components";
import { PostList } from "../ui/post-list/PostList";
import { usePostsStore } from "../store/posts.store";
import { PostCategories } from "../ui/post-categories/PostCategories";

export const PostsIndex: React.FC = () => {
  const { t } = useTranslation();
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const posts = usePostsStore((state) => state.postsForView);
  const loading = usePostsStore((state) => state.loading);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <AppLayout loading={loading}>
      <PageHeader title={t("Guides & Inspiration")} hasBackButton={false} />
      <div className="post-page">
        <PostCategories />
        <PostList posts={posts} />
      </div>
    </AppLayout>
  );
};
