import { useState } from "react";
import { Button } from "../../../../components";
import { UploadContainer, UploadIcon, UploadNote, HiddenInput } from "./styles";

import { ReactComponent as ImagesLogo } from "./assets/Images.svg";

type Props = {
  onImageUpload: (filename: string) => void;
};

export const ImageUpload = ({ onImageUpload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onImageUpload(data.filename);
        } else {
          console.error("Upload failed:", response.status);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <UploadContainer
      onClick={() => document.getElementById("imageInput")?.click()}
    >
      <UploadIcon>
        <ImagesLogo />
      </UploadIcon>
      <Button variant="primary" onClick={handleUpload}>
        Choose Image
      </Button>
      <UploadNote>or, drop the file here</UploadNote>
      <HiddenInput
        type="file"
        id="imageInput"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
      />
    </UploadContainer>
    // <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
    //   Upload
    // </Button>
  );
};
