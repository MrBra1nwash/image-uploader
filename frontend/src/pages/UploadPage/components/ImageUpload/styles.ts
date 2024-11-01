import styled from "styled-components";

export const UploadContainer = styled.div<{ isDragging: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ isDragging }) => (isDragging ? "#f0f0f0" : "#eaeaea")};

  &:hover {
    border-color: #007bff;
  }
`;

export const UploadNoteHighlight = styled.span`
  font-weight: bold;
  color: #666;
`;

export const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

export const UploadNote = styled.p`
  text-align: center;
  padding: 4px 20px;
  font-size: 14px;
`;

export const HiddenInput = styled.input`
  display: none;
`;
