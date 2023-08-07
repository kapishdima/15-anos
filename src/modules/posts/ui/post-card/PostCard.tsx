import React from "react";
import { Post } from "../../store/posts.type";
import { translated } from "@/app/utils/locale";
import { Button, IconButton, LikeIcon } from "@/components";
import classNames from "classnames";
import { useLike } from "../../hooks/useLike";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { usePostsStore } from "../../store/posts.store";
import { getCategory } from "../../store/posts.selector";
import { ReadedIndicator } from "../readed-indicator/ReadedIndicator";

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { imageSmall, title, description } = post;

  const savePost = usePostsStore((state) => state.savePost);
  const category = usePostsStore((state) => getCategory(post.tagId, state));
  const { likePost, disslikePost, liked, loading } = useLike(post.id);

  return (
    <Link to={AppRoutes.POST} onClick={() => savePost(post)}>
      <div className="post-card">
        <div className="post-card__image">
          <img src={imageSmall} alt={translated(title)} />
        </div>
        <div className="post-card__info">
          <h4 className="post-card__title">{translated(title)}</h4>
          <p className="post-card__description">{translated(description)}</p>

          <div className="post-action">
            <IconButton
              appearance="outline"
              //   loading={loading}
              loadingVariant="accent"
              classes={classNames("like-button", {
                liked,
              })}
              onClick={liked ? disslikePost : likePost}
            >
              <LikeIcon />
            </IconButton>
          </div>

          <div className="post-footer">
            <Button style={{ backgroundColor: `#${category?.color}` }} disabled>
              {translated(category?.title || "")}
            </Button>
            <ReadedIndicator postId={post.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};
