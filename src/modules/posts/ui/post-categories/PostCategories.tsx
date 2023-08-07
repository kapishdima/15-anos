import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ScrollXArea } from "@/components";

import { usePostsStore } from "../../store/posts.store";
import { PostTag } from "./PostTag";

export const PostCategories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPostsCategory = usePostsStore((state) => state.fetchPostsCategory);
  const filterPosts = usePostsStore((state) => state.filterPosts);
  const tags = usePostsStore((state) => state.categories);

  const storedTags = searchParams.get("tags");

  const onTagClick = (tag: string) => {
    let tags = (storedTags?.split(",") || []).filter((tag) =>
      Boolean(tag.length)
    );

    if (tags.includes(tag)) {
      tags = tags.filter((tagId) => tagId !== tag);
    } else {
      tags.push(tag);
    }

    if (tag === "All" || !tags.length) {
      searchParams.delete("tags");
    } else {
      searchParams.set("tags", tags.join(","));
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchPostsCategory();
  }, []);

  useEffect(() => {
    filterPosts(storedTags?.split(","));
  }, [searchParams]);

  return (
    <ScrollXArea>
      {tags.map((tag) => (
        <PostTag
          tag={tag}
          onClick={() => onTagClick(tag.tagId)}
          shouldRemove={Boolean(storedTags?.split(",").includes(tag.tagId))}
        />
      ))}
    </ScrollXArea>
  );
};
