import Micromodal from "micromodal";
import { useState } from "react";

export const useModal = () => {
  const [opened, setOpened] = useState(false);
  const open = (id: string) => {
    setOpened(true);
    setTimeout(() => {
      Micromodal.show(id);
    }, 100);
  };
  const close = (id: string) => {
    setOpened(false);
    setTimeout(() => {
      Micromodal.close(id);
    }, 100);
  };

  return {
    open,
    close,
    opened,
  };
};
