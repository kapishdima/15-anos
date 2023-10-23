import { ProfileColors } from "../models/profile-colors";
import { useProfileStore } from "../store/profile";

export const useProfileColor = (colorName: ProfileColors) => {
  const profile = useProfileStore((state) => state.profile);

  if (!profile) {
    return "";
  }

  return profile.colors.find((color) => color.id === colorName)?.color || "";
};
