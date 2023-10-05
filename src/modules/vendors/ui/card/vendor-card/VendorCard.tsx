import { AppRoutes } from "@/app/router/routes";
import { translated } from "@/app/utils/locale";
import { IconButton, LikeIcon } from "@/components";
import { useLike } from "@/modules/vendors/hooks/useLike";
import { useVendorsStore } from "@/modules/vendors/store/vendors.store";
import { SearchedVendor } from "@/modules/vendors/store/vendors.types";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type VendorCardProps = SearchedVendor;

export const VendorCard: React.FC<VendorCardProps> = (vendor) => {
  const { id, title, image, description } = vendor;

  const { likeVendor, disslikeVendor, liked, loading } = useLike(vendor);
  const saveVendor = useVendorsStore((state) => state.saveVendor);

  const translatedDescription = translated(description);

  const onClick = () => {
    saveVendor(vendor);
  };

  return (
    <Link
      to={AppRoutes.SINGLE_VENDOR}
      className="vendor-card"
      onClick={onClick}
    >
      <div className="vendor-card__image">
        <img src={image} alt={translated(title)} />
      </div>
      <div className="vendor-card__content">
        <h3 className="vendor-card__title">{translated(title)}</h3>
        <p
          className="vendor-card__description"
          dangerouslySetInnerHTML={{
            __html: translatedDescription.replaceAll("<n>", "<br/>"),
          }}
        ></p>
      </div>
      <div className="vendor-card__actions">
        <IconButton
          appearance="outline"
          loading={loading}
          loadingVariant="accent"
          classes={classNames("like-button", {
            liked,
          })}
          onClick={liked ? disslikeVendor : likeVendor}
        >
          <LikeIcon />
        </IconButton>
      </div>
    </Link>
  );
};
