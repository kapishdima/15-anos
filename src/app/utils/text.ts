export const truncateText = (text: string, max: number) => {
  if (text.length <= max) {
    return text;
  } else {
    return text.substring(0, max) + "...";
  }
};
