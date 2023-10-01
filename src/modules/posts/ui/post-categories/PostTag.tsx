import React from "react";

import { Button, CloseIcon } from "@/components";
import { translated } from "@/app/utils/locale";

import { PostCategory } from "../../store/posts.type";

type PostTagProps = {
  tag: PostCategory;
  onClick: () => void;
  activeTag: boolean;
};

export const PostTag: React.FC<PostTagProps> = ({
  tag,
  onClick,
  activeTag,
}) => {
  return (
    <Button
      style={{
        backgroundColor: `#${tag.color}`,
        opacity: activeTag ? 1 : 0.5,
        minWidth: "60px",
      }}
      onClick={onClick}
    >
      {translated(tag.title)}
    </Button>
  );
};
