import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ScrollXArea, Slider } from "@/components";

import { usePostsStore } from "../../store/posts.store";
import { PostTag } from "./PostTag";

export const PostCategories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPostsCategory = usePostsStore((state) => state.fetchPostsCategory);
  const filterPosts = usePostsStore((state) => state.filterPosts);
  const tags = usePostsStore((state) => state.categories);

  const storedTag = searchParams.get("tag");

  const onTagClick = (tag: string) => {
    if (tag === "All") {
      searchParams.delete("tag");
    } else {
      searchParams.set("tag", tag);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchPostsCategory();
  }, []);

  useEffect(() => {
    filterPosts(storedTag);
  }, [searchParams]);

  return (
    <ScrollXArea scrollWhenClick containerStyle={{ width: "100%" }}>
      {tags.map((tag) => (
        <PostTag
          tag={tag}
          onClick={() => onTagClick(tag.tagId)}
          activeTag={tag.tagId === storedTag || storedTag === null}
        />
      ))}
    </ScrollXArea>
  );
};
