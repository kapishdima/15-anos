import React from "react";
import { Post } from "../../store/posts.type";
import { PostCard } from "../post-card/PostCard";

type PostListProps = {
  posts: Post[];
};

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};
