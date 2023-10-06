import Micromodal from "micromodal";

export const useModal = () => {
  const open = (id: string) => Micromodal.show(id);
  const close = (id: string) => Micromodal.close(id);

  return {
    open,
    close,
  };
};
