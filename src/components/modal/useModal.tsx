import Micromodal from "micromodal";
import { useState } from "react";

export const useModal = () => {
  const [opened, setOpened] = useState(false);
  const open = (id: string) => {
    Micromodal.show(id);
    setOpened(true);
  };
  const close = (id: string) => {
    Micromodal.close(id);
    setOpened(false);
  };

  return {
    open,
    close,
    opened,
  };
};
