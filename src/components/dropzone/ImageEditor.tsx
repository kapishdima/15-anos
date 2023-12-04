import React, { useEffect, useRef, useState } from "react";

import { Modal } from "../modal/Modal";
import ReactCropper from "react-cropper";

import "cropperjs/dist/cropper.css";

type ImageEditorProps = {
  modalOpened: boolean;
  modalId: string;
  image?: string;
  onCropped: (file: File[]) => void;
};

export const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  modalId,
  modalOpened,
  onCropped,
}) => {
  const [cropper, setCropper] = useState<Cropper | null>(null);

  const onClick = () => {
    const canvas = cropper?.getCroppedCanvas();
    canvas?.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const file = new File([blob], "main.jpg", { type: "image/jpeg" });
      onCropped([file]);
    });
  };

  return (
    <Modal
      id={modalId}
      confirmButtonText={"Crop"}
      onConfirm={onClick}
      maxWidth="50vw"
    >
      {image && modalOpened && (
        <ReactCropper
          src={image}
          style={{ height: 450, width: "100%" }}
          aspectRatio={1 / 1}
          initialAspectRatio={1 / 1}
          viewMode={1}
          background={false}
          onInitialized={(instance) => setCropper(instance)}
        />
      )}
    </Modal>
  );
};
