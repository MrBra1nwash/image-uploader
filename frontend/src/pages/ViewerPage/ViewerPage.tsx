import { useParams } from "react-router-dom";
import { ImageViewer } from "../../components";

export const ViewerPage = () => {
  const { filename } = useParams();

  return <div>{filename && <ImageViewer imageUrl={filename} />}</div>;
};
