import React, { useEffect } from "react";
import {
  DropzoneField,
  AppLayout,
  Button,
  Form,
  PageHeader,
} from "@components/index";

import { useTranslation } from "react-i18next";

import { Colors } from "../ui/Colors/Colors";
import { ProfileColors, useProfileStore } from "@/modules/profile";

import EmptyPhoto from "@/image/emptyphoto.png";

const defaultColors = [
  {
    title: "Countdown text",
    color: "#ed819e",
    id: ProfileColors.CountdownText,
  },
  {
    title: "Countdown title",
    color: "#ed819e",
    id: ProfileColors.CountdownTitle,
  },
  {
    title: "Countdown",
    color: "#ffffff",
    id: ProfileColors.CountdownBg,
  },
  {
    title: "Navbar Text",
    color: "#ed819e",
    id: ProfileColors.NavbarText,
  },
  {
    title: "Navbar",
    color: "#ffffff",
    id: ProfileColors.NavbarBg,
  },
  {
    title: "Tab bar text",
    color: "#ed819e",
    id: ProfileColors.TabbarText,
  },
  {
    title: "Tab bar unselected",
    color: "#ddd",
    id: ProfileColors.TabbarText,
  },
  {
    title: "Tab bar",
    color: "#ffffff",
    id: ProfileColors.TabbarBg,
  },
  {
    title: "Invitation",
    color: "#ffffff",
    id: ProfileColors.InvintationBg,
  },
  {
    title: "Invitation title",
    color: "#ffffff",
    id: ProfileColors.InvintationTitle,
  },
  {
    title: "Invitation text",
    color: "#ed819e",
    id: ProfileColors.InvintationText,
  },
  {
    title: "Invitation button",
    color: "#000000",
    id: ProfileColors.InvintationButton,
  },
];

export const DesignSettingsIndex: React.FC = () => {
  const { t } = useTranslation();
  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );
  const fetchProfileMainImage = useProfileStore(
    (state) => state.fethcProfileMainImage
  );
  const saveProfileDetails = useProfileStore(
    (state) => state.saveProfileDetails
  );
  const saveImageMain = useProfileStore((state) => state.saveImageMain);

  const mainImage = useProfileStore((state) => state.mainImage);
  const profile = useProfileStore((state) => state.profile);
  const fetchLoading = useProfileStore((state) => state.fetchLoading);
  const saveLoading = useProfileStore((state) => state.saveLoading);
  const uploadImageLoading = useProfileStore(
    (state) => state.uploadImageLoading
  );

  const onSubmit = async (values: any) => {
    // @ts-ignore
    await saveProfileDetails({ colors: values.colors });
    await fetchProfileDetails();
  };

  const onImageMainUpload = async (file: File) => {
    await saveImageMain(file);
    await fetchProfileMainImage();
  };

  useEffect(() => {
    fetchProfileDetails();
  }, [fetchProfileDetails]);

  const initialValues = {
    colors: profile?.colors || defaultColors,
  };

  return (
    <AppLayout loading={fetchLoading}>
      <div className="home-page">
        <PageHeader title="Design" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <Colors />
            <DropzoneField
              loading={uploadImageLoading}
              name="main_image"
              label="Main image"
              defaultFile={{
                name: "main_image",
                preview: mainImage || EmptyPhoto,
              }}
              onUpload={onImageMainUpload}
            />
            <Button variant="success" type="submit" loading={saveLoading}>
              {t("Save the design")}
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
