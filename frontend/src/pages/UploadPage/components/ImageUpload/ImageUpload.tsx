import { useState } from "react";
import { Button } from "../../../../components";

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
    <div>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
      />
      <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </Button>
      <Button variant="primary" onClick={handleUpload} disabled>
        Upload
      </Button>
      <Button
        variant="secondary"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </Button>
      <Button variant="secondary" onClick={handleUpload} disabled>
        Upload
      </Button>
    </div>
  );
};