import { getCategoryImage } from "@/app/utils/category-icon";
import { Button, Card } from "@/components";
import { SearchedVendor } from "@/modules/vendors/store/vendors.types";
import React from "react";
import { useTranslation } from "react-i18next";

type ManualVendorCardProps = SearchedVendor & { color: string };

export const ManualVendorCard: React.FC<ManualVendorCardProps> = ({
  color,
  ...vendor
}) => {
  const { id, title, categoryId } = vendor;

  const { t } = useTranslation();

  return (
    <Card
      id={id}
      title={title}
      icon={getCategoryImage(categoryId as any)}
      color={color}
      extra={<Button variant="success">{t("Contact")}</Button>}
      onOpen={function (): void {
        throw new Error("Function not implemented.");
      }}
      onDelete={function (id: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
