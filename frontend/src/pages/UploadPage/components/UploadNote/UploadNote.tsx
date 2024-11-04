import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "./constants";
import { Reupload, UploadNoteContainer, UploadNoteHighlight } from "./styles";

type Props = {
  uploadedFilename?: string;
  onNewUpload: () => void;
};

export const UploadNote = ({ onNewUpload, uploadedFilename }: Props) => {
  return (
    <UploadNoteContainer>
      {uploadedFilename ? (
        <>
          or upload a <Reupload onClick={onNewUpload}>new file</Reupload>{" "}
        </>
      ) : null}
      or drop the file here. Supported extensions:{" "}
      <UploadNoteHighlight>{ALLOWED_EXTENSIONS.join(", ")}</UploadNoteHighlight>
      . Max size is{" "}
      <UploadNoteHighlight>{MAX_FILE_SIZE} Mb</UploadNoteHighlight>.
    </UploadNoteContainer>
  );
};
