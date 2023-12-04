import React from "react";
import { Button, IconButton, LikeIcon } from "@/components";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { translated } from "@/app/utils/locale";

import { Post } from "../../store/posts.type";
import { useLike } from "../../hooks/useLike";
import { usePostsStore } from "../../store/posts.store";
import { getCategory } from "../../store/posts.selector";
import { ReadedIndicator } from "../readed-indicator/ReadedIndicator";
import { Protected, RoleActions } from "@/modules/roles";

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { imageSmall, title, description } = post;

  const savePost = usePostsStore((state) => state.savePost);
  const category = usePostsStore((state) => getCategory(post.tagId, state));
  const postInProccessing = usePostsStore((state) => state.postInProcessing);
  const { likePost, disslikePost, liked, loading } = useLike(post.id);

  return (
    <Link to={AppRoutes.POST} onClick={() => savePost(post)}>
      <div className="post-card">
        <div className="post-card__image">
          <img src={imageSmall} alt={translated(title)} />
        </div>
        <Protected action={RoleActions.LIKE_POST}>
          <div className="post-action">
            <IconButton
              appearance="outline"
              loadingVariant="accent"
              classes={classNames("like-button", {
                liked,
              })}
              loading={postInProccessing === post.id && loading}
              onClick={liked ? disslikePost : likePost}
              propagateEvent={false}
            >
              <LikeIcon />
            </IconButton>
          </div>
        </Protected>

        <div className="post-card__info">
          <div className="post-card__content">
            <div className="post-card__header">
              <ReadedIndicator postId={post.id} />
              <h4 className="post-card__title">{translated(title)}</h4>
            </div>
            <p className="post-card__description">{translated(description)}</p>
          </div>

          <div className="post-footer">
            <Button
              style={{
                backgroundColor: `#${category?.color}`,
                minWidth: "80px",
              }}
              disabled
            >
              {translated(category?.title || "")}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
