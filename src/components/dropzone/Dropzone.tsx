import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { UploadIcon } from "../icons/UploadIcon";
import { Button } from "../button/Button/Button";
import { Image } from "../image/Image";
import { ImageEditor } from "./ImageEditor";
import { IconButton } from "../button/IconButton/IconButton";

import CropIcon from "@image/icons/crop.svg";
import { useModal } from "../modal/useModal";

type AcceptedFileItem = File & {
  preview: string;
};

export type DefaultFileItem = {
  name?: string;
  preview: string;
};

type DropzoneProps = {
  onUpload: (files: File) => void;
  defaultFile?: DefaultFileItem;
  loading?: boolean;
};

const IMAGE_EDITOR_MODAL = "image_editor_modal";

export const Dropzone: React.FC<DropzoneProps> = ({
  onUpload,
  loading,
  defaultFile = null,
}) => {
  const {
    open: openEditorModal,
    opened: editorModalOpened,
    close,
  } = useModal();
  const [file, setFile] = useState<AcceptedFileItem | DefaultFileItem | null>(
    defaultFile
  );

  const isSameFile = file?.name === defaultFile?.name;

  const onDrop = (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    setFile(
      Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile),
      })
    );
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  const onEditorButtonClick = () => {
    openEditorModal(IMAGE_EDITOR_MODAL);
  };

  const onCropped = (file: File[]) => {
    onDrop(file);
    close(IMAGE_EDITOR_MODAL);
  };

  useEffect(() => {
    setFile(defaultFile);
  }, [defaultFile]);
  return (
    <>
      <div className="dropzone">
        <div className="dropzone-container" {...getRootProps()}>
          <input {...getInputProps()} className="dropzone-input" />
          <UploadIcon />
          <p className="dropzone-label">
            Drag 'n' drop some files here, or click to select files
          </p>
          <p className="dropzone-available">.png, .jpg, .jpeg </p>

          <div className="dropzone-file-bg">
            {!isSameFile && (
              <div className="editor-button">
                <IconButton
                  propagateEvent={false}
                  onClick={onEditorButtonClick}
                >
                  <img src={CropIcon} alt="" />
                </IconButton>
              </div>
            )}
            {file && (
              <Image
                style={{ maxWidth: "100%" }}
                src={file.preview}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            )}
          </div>
        </div>
        <div className="dropzone-actions">
          {!isSameFile && (
            <Button
              loading={loading}
              variant="success"
              onClick={() => onUpload(file as AcceptedFileItem)}
            >
              Upload
            </Button>
          )}
          {file && <Button onClick={open}>Change image</Button>}
        </div>
      </div>
      {file && file.preview && (
        <ImageEditor
          modalId={IMAGE_EDITOR_MODAL}
          image={file?.preview}
          modalOpened={editorModalOpened}
          onCropped={onCropped}
        />
      )}
    </>
  );
};
