import React from "react";
import { AppLayout, PageBanner } from "@/components";
import { translated } from "@/app/utils/locale";

import { usePostsStore } from "../store/posts.store";

export const SinglePost: React.FC = () => {
  const getPost = usePostsStore((state) => state.getPost);
  const post = getPost();

  return (
    <AppLayout>
      <PageBanner image={post.image} title={translated(post.title)} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: translated(post.text) }}
      ></div>
    </AppLayout>
  );
};
