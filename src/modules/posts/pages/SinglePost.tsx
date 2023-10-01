import React, { useEffect } from "react";
import { AppLayout, PageBanner, PageHeader, PageTitle } from "@/components";
import { translated } from "@/app/utils/locale";

import { usePostsStore } from "../store/posts.store";

export const SinglePost: React.FC = () => {
  const getPost = usePostsStore((state) => state.getPost);
  const setPostReaded = usePostsStore((state) => state.setPostReaded);

  const post = getPost();
  const postContent = translated(post.text);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setPostReaded(post.id);
  }, []);

  return (
    <AppLayout>
      <PageHeader hasBackButton />
      <PageBanner image={post.image} title={translated(post.title)} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: postContent.replaceAll("data-src", "src"),
        }}
      ></div>
    </AppLayout>
  );
};
