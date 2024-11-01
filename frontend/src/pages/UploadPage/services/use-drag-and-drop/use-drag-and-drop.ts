import { useState, DragEvent } from "react";

type Props = {
  handleUpload: (file: File) => Promise<void>;
};

export const useDragAndDrop = ({ handleUpload }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    // To allow drop in specific area, but forbid drop in other parts of the page
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
  };
};
