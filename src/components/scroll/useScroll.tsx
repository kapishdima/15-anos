import { useState } from "react";

const SCROLL_OFFSET = 200;

export const useScroll = (
  scrollArea: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [position, setPosition] = useState(0);

  if (!scrollArea.current) {
    return null;
  }

  const scroll = (value: number) => {
    if (!scrollArea?.current) {
      return;
    }

    scrollArea.current.scrollTo({
      left: value,
      behavior: "smooth",
    });
  };

  const next = () => {
    if (!scrollArea?.current) {
      return;
    }

    const rect = scrollArea.current.getBoundingClientRect();
    scroll(rect.width);
  };

  const prev = () => {
    if (!scrollArea?.current) {
      return;
    }

    scroll(0);
  };

  const onChangePosition = () => {
    if (!scrollArea?.current) {
      return;
    }

    const scrollLeft = scrollArea.current?.scrollLeft;
    setPosition(scrollLeft);
  };

  const scrollIntoElement = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    // console.log(target);
    // const rect = target.getBoundingClientRect();
    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    // scroll(rect.width);
  };

  const hasNext =
    position < scrollArea.current.getBoundingClientRect().width - SCROLL_OFFSET;
  const hasPrev = position !== 0;

  return {
    next,
    prev,
    onChangePosition,
    hasNext,
    hasPrev,
    scrollIntoElement,
  };
};
