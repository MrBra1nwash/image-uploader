import { useState, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import { Description, PageContainer, Title } from "./styles";

export const UploadPage = () => {
  const navigate = useNavigate();
  const [uploadedFilename, setUploadedFilename] = useState<string>();

  const handleImageUpload = (filename: string) => {
    setUploadedFilename(filename);
  };

  const handleViewImage = () => {
    if (uploadedFilename) {
      navigate(`/viewer/${uploadedFilename}`);
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  };

  return (
    <PageContainer onDragOver={handleDrag}>
      <Title>Free Online Image Viewer</Title>
      <Description>Upload and View Images Online</Description>
      <ImageUpload onImageUpload={handleImageUpload} />
      {uploadedFilename && (
        <button onClick={handleViewImage}>View Image</button>
      )}
    </PageContainer>
  );
};
