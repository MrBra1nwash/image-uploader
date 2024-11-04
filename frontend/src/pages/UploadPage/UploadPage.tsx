import { DragEvent } from "react";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import { Description, PageContainer, Title } from "./styles";

export const UploadPage = () => {
  // Disable dropping for other elements
  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  };

  return (
    <PageContainer onDragOver={handleDrag}>
      <Title>Free Online Image Viewer</Title>
      <Description>Upload and View Images Online</Description>
      <ImageUpload />
    </PageContainer>
  );
};
