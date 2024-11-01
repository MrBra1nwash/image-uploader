import { ChangeEvent, useRef } from "react";
import { Button, ErrorBanner } from "../../../../components";
import {
  HiddenInput,
  UploadContainer,
  UploadIcon,
  UploadNote,
  UploadNoteHighlight,
} from "./styles";

import { BACK_END_URL } from "../../../../constants";
import { useFetch } from "../../../../services";
import { ReactComponent as ImagesLogo } from "./assets/images.svg";
import { useDragAndDrop } from "../../services/use-drag-and-drop/use-drag-and-drop";
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "./constants";

type Props = {
  onImageUpload: (filename: string) => void;
};

export const ImageUpload = ({ onImageUpload }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchData, error } = useFetch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
      // To fix the case when we upload the same file multiple times.
      // Without this fix just nothing happens in that case and it is disappointing.
      event.target.value = "";
    }
  };

  // Just for the better UX
  const handleContainerClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    await fetchData(
      `${BACK_END_URL}/upload`,
      {
        method: "POST",
        body: formData,
      },
      {
        onSuccess: (data: any) => {
          onImageUpload(data.filename);
        },
      }
    );
  };

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
  } = useDragAndDrop({ handleUpload });

  const uploadNoteText = (
    <>
      or, drop the file here. Supported extensions:{" "}
      <UploadNoteHighlight>{ALLOWED_EXTENSIONS.join(", ")}</UploadNoteHighlight>
      . Max size is{" "}
      <UploadNoteHighlight>{MAX_FILE_SIZE} Mb</UploadNoteHighlight>.
    </>
  );

  return (
    <>
      {/* Ideally, it should be placed at the root level of the application.
      But in this case, we need to use a context or useReducer to propagate the error message up the tree.
      This would create unnecessary complexity. Since we don't expect errors to come from 
      anywhere else, it's perfectly fine to keep it here */}
      <ErrorBanner message={error?.message} />

      <UploadContainer
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        isDragging={isDragging}
        onClick={handleContainerClick}
      >
        <UploadIcon>
          <ImagesLogo />
        </UploadIcon>
        <Button variant="primary">Choose Image</Button>
        <UploadNote>{uploadNoteText}</UploadNote>
        <HiddenInput
          ref={inputRef}
          type="file"
          id="imageInput"
          accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
          onChange={handleFileChange}
        />
      </UploadContainer>
    </>
  );
};
