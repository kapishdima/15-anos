import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import {
  AppLayout,
  AspectRatio,
  Button,
  IconButton,
  LikeIcon,
  PageHeader,
  VendorsIcon,
} from "@/components";
import { translated } from "@/app/utils/locale";

import { useVendorsStore } from "../store/vendors.store";
import { useLike } from "../hooks/useLike";
import { ContactViewer } from "../ui/contacts/viewer/ContactsViewer";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { Protected, RoleActions } from "@/modules/roles";

export const SingleVendor: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setCurrentVendor = useVendorsStore((state) => state.setCurrentVendor);
  const getVendor = useVendorsStore((state) => state.getVendor);
  const setVendorViewed = useVendorsStore((state) => state.setVendorViewed);
  const vendor = getVendor();

  const { likeVendor, disslikeVendor, liked, loading } = useLike(vendor);

  const description = translated(vendor.description);

  const onClick = () => {
    setCurrentVendor(vendor);
    navigate(AppRoutes.UPDATE_VENDOR);
  };

  useEffect(() => {
    setVendorViewed(vendor.id);
  }, []);

  return (
    <AppLayout fullWidth>
      <PageHeader title={t("Vendor")} hasBackButton />

      <div className="vendor-page">
        <div className="vendor-page__image">
          <img src={vendor.image} alt={translated(vendor.title)} />
          <div className="vendor-page__actions">
            <Protected action={RoleActions.LIKE_VENDOR}>
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
            </Protected>
          </div>
        </div>
        <div className="vendor-page__content">
          <h4 className="vendor-page__title">{translated(vendor.title)}</h4>
          <p
            className="vendor-page__description"
            dangerouslySetInnerHTML={{
              __html: description.replaceAll("<n>", "<br/>"),
            }}
          ></p>
          {liked && (
            <div className="vendor-page__details">
              <Button variant="text" appearance="ghost" onClick={onClick}>
                <VendorsIcon />
                {t("View vendor details")}
              </Button>
            </div>
          )}

          <div className="vendor-page__contact">
            <h4 className="vendor-page__contact-info">
              {t(
                "Don't forget to tell the vendor that you got it's contact from Weddi to check if there is a discount for you."
              )}
            </h4>
            <ContactViewer
              vendorId={vendor.id}
              contacts={vendor.contacts}
              placement="top-start"
              buttonText="Contact the vendor"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
