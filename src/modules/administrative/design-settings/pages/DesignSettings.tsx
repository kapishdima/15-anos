import React, { useEffect } from "react";
import { AppLayout, Button, Form, PageHeader } from "@components/index";

import { useTranslation } from "react-i18next";
import { DropzoneField } from "@/components/fields/DropzoneField";
import { Colors } from "../ui/Colors/Colors";
import { useProfileStore } from "@/modules/profile";

const defaultColors = [
  {
    title: "Countdown",
    color: "#ed819e",
    id: "countdownColor",
  },
  {
    title: "Countdown",
    color: "#ed819e",
    id: "countdownTextColor",
  },
  {
    title: "Countdown",
    color: "#ffffff",
    id: "countdownTextDateColor",
  },
  {
    title: "Upper bar",
    color: "#ed819e",
    id: "upperBarColor",
  },
  {
    title: "Upper bar",
    color: "#ffffff",
    id: "upperBarTextColor",
  },
  {
    title: "Lower bar",
    color: "#ed819e",
    id: "lowerBarColor",
  },
  {
    title: "Lower bar",
    color: "#ddd",
    id: "lowerBarColor",
  },
  {
    title: "Lower bar",
    color: "#ffffff",
    id: "lowerBarColor",
  },
  {
    title: "Invitation",
    color: "#ffffff",
    id: "invitationColor",
  },
  {
    title: "Invitation",
    color: "#ffffff",
    id: "invitationColor",
  },
  {
    title: "Invitation",
    color: "#ed819e",
    id: "invitationColor",
  },
  {
    title: "Invitation text",
    color: "#000000",
    id: "invitationTextColor",
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
              defaultFile={{ name: "main_image", preview: mainImage }}
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
