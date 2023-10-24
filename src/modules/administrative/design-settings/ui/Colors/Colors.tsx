import React from "react";
import { ColorField } from "../ColorField/ColorField";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { ProfileColor } from "@/modules/profile";

export const Colors: React.FC = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const colors: ProfileColor[] = getValues("colors");

  return (
    <div className="colors">
      <label className="colors-label">{t("Theme colors")}</label>
      <div className="colors-list">
        {colors.map((color, index) => (
          <ColorField name={`colors.[${index}].color`} label={color.title} />
        ))}
      </div>
    </div>
  );
};
