import { useParams } from "react-router-dom";
import { ImageViewer } from "./components/ImageViewer/ImageViewer";

export const ViewerPage = () => {
  const { filename } = useParams();

  return <div>{filename && <ImageViewer imageUrl={filename} />}</div>;
};
