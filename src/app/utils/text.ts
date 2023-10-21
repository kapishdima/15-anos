export const truncateText = (text: string, max: number) => {
  if (text.length <= max) {
    return text;
  } else {
    return text.substring(0, max) + "...";
  }
};

export const capitalize = (value: string, type: "sentence" | "words") => {
  if (type === "sentence") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else if (type === "words") {
    return capitalizeWords(value);
  }
};

export const capitalizeWords = (value: string) => {
  const words = value.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};
