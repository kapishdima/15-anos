import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import {
  AppLayout,
  Button,
  IconButton,
  LikeIcon,
  PageHeader,
  VendorsIcon,
} from "@/components";
import { translated } from "@/app/utils/locale";

import { useVendorsStore } from "../store/vendors.store";
import { useLike } from "../hooks/useLike";

export const SingleVendor: React.FC = () => {
  const { t } = useTranslation();

  const getVendor = useVendorsStore((state) => state.getVendor);
  const setVendorViewed = useVendorsStore((state) => state.setVendorViewed);
  const vendor = getVendor();

  const { likeVendor, disslikeVendor, liked, loading } = useLike(vendor);

  const description = translated(vendor.description);

  useEffect(() => {
    setVendorViewed(vendor.id);
  }, []);

  return (
    <AppLayout>
      <PageHeader title={t("Vendor")} hasBackButton />

      <div className="vendor-page">
        <div className="vendor-page__image">
          <img src={vendor.image} alt={translated(vendor.title)} />
          <div className="vendor-page__actions">
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
        </div>
        <h4 className="vendor-page__title">{translated(vendor.title)}</h4>
        <p className="vendor-page__description">
          {description.replaceAll("<n>", "\n")}
        </p>
        {/* TODO if liked  */}
        {liked && (
          <div className="vendor-page__details">
            <Button variant="text" appearance="ghost">
              <VendorsIcon />
              {t("View vendor details")}
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
