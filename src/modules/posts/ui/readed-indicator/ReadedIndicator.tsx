import React from "react";
import { usePostsStore } from "../../store/posts.store";

type ReadedIndicatorProps = {
  postId: string;
};

export const ReadedIndicator: React.FC<ReadedIndicatorProps> = ({ postId }) => {
  const getPostReaded = usePostsStore((state) => state.getPostReaded);

  if (getPostReaded().includes(postId)) {
    return null;
  }
  return <div className="readed-indicator"></div>;
};
