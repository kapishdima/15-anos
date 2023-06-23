import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '../icons/UploadIcon';

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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone">
      <div className="dropzone-container" {...getRootProps()}>
        <input {...getInputProps()} className="dropzone-input" />
        <UploadIcon />
        <p className="dropzone-label">Drag 'n' drop some files here, or click to select files</p>
        <p className="dropzone-available">.png, .jpg, .jpeg </p>
      </div>
      <div className="dropzone-files">
        {files.map((file) => (
          <div className="dropzone-file">
            <img
              alt={file.name}
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
