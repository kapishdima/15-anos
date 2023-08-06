import React from "react";

import { Button, CloseIcon } from "@/components";
import { translated } from "@/app/utils/locale";

import { PostCategory } from "../../store/posts.type";

type PostTagProps = {
  tag: PostCategory;
  onClick: () => void;
  shouldRemove: boolean;
};

export const PostTag: React.FC<PostTagProps> = ({
  tag,
  onClick,
  shouldRemove,
}) => {
  return (
    <Button style={{ backgroundColor: `#${tag.color}` }} onClick={onClick}>
      {translated(tag.title)}
      {shouldRemove && <CloseIcon />}
    </Button>
  );
};
