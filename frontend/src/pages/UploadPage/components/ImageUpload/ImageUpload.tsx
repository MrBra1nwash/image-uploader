import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Button, ErrorBanner } from "../../../../components";
import {
  HiddenInput,
  UploadContainer,
  UploadIcon,
  ViewImageButtonContainer,
} from "./styles";

import { useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../../../../constants";
import { useFetch } from "../../../../services";
import { useDragAndDrop } from "../../services/use-drag-and-drop/use-drag-and-drop";
import { ReactComponent as ImagesLogo } from "./assets/images.svg";
import { UploadNote } from "../UploadNote/UploadNote";

export const ImageUpload = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchData, error } = useFetch();

  const [uploadedFilename, setUploadedFilename] = useState("");

  const handleViewImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (uploadedFilename) {
      navigate(`/viewer/${uploadedFilename}`);
    }
  };

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
          setUploadedFilename(data.filename);
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

  const handleNewUpload = () => {
    setUploadedFilename("");
  };

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
        onClick={handleContainerClick}
        isDragging={isDragging}
      >
        <UploadIcon>
          <ImagesLogo />
        </UploadIcon>
        {!uploadedFilename && <Button variant="primary">Choose Image</Button>}
        {uploadedFilename && (
          <>
            <ViewImageButtonContainer>
              <Button variant="primary" onClick={handleViewImage}>
                View {uploadedFilename}
              </Button>
            </ViewImageButtonContainer>
          </>
        )}
        <UploadNote
          uploadedFilename={uploadedFilename}
          onNewUpload={handleNewUpload}
        />
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
