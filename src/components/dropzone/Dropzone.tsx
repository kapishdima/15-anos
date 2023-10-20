import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../icons/UploadIcon";
import { Button } from "../button/Button/Button";
import { Image } from "../image/Image";

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

export const Dropzone: React.FC<DropzoneProps> = ({
  onUpload,
  loading,
  defaultFile = null,
}) => {
  const [file, setFile] = useState<AcceptedFileItem | DefaultFileItem | null>(
    defaultFile
  );

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

  useEffect(() => {
    setFile(defaultFile);
  }, [defaultFile]);
  return (
    <div className="dropzone">
      <div className="dropzone-container" {...getRootProps()}>
        <input {...getInputProps()} className="dropzone-input" />
        <UploadIcon />
        <p className="dropzone-label">
          Drag 'n' drop some files here, or click to select files
        </p>
        <p className="dropzone-available">.png, .jpg, .jpeg </p>

        <div className="dropzone-file-bg">
          {file && (
            <Image
              // alt={file.name}
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          )}
        </div>
      </div>
      <div className="dropzone-actions">
        {file && (
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
  );
};
