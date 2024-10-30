import React, { useState } from "react";
import { ImageUpload, ImageViewer } from "./components";

const App: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageUpload = (filename: string) => {
    setUploadedImageUrl(filename);
  };

  return (
    <div>
      <ImageUpload onImageUpload={handleImageUpload} />
      {uploadedImageUrl && (
        <div>
          <ImageViewer imageUrl={uploadedImageUrl} />
        </div>
      )}
    </div>
  );
};

export default App;
