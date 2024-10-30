import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components";

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

  return (
    <div>
      <ImageUpload onImageUpload={handleImageUpload} />
      {uploadedFilename && (
        <button onClick={handleViewImage}>View Image</button>
      )}
    </div>
  );
};
