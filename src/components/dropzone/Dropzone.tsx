import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '../icons/UploadIcon';
import { Button } from '../button/Button/Button';

type FileItem = File & {
  preview: string;
};

type DropzoneProps = {
  onAccept?: (files: File[]) => void;
};

export const Dropzone: React.FC<DropzoneProps> = ({ onAccept }) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );

    onAccept && onAccept(acceptedFiles);
  };
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

  return (
    <div className="dropzone">
      <div className="dropzone-container" {...getRootProps()}>
        <input {...getInputProps()} className="dropzone-input" />
        <UploadIcon />
        <p className="dropzone-label">Drag 'n' drop some files here, or click to select files</p>
        <p className="dropzone-available">.png, .jpg, .jpeg </p>
        {files && files.length > 0 && (
          <div className="dropzone-actions">
            <Button onClick={open}>Upload</Button>
          </div>
        )}
        <div className="dropzone-file-bg">
          {files && files.length > 0 && (
            <img
              alt={files[0].name}
              src={files[0].preview}
              onLoad={() => {
                URL.revokeObjectURL(files[0].preview);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
