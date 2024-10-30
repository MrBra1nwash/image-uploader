import styled from "styled-components";

export const UploadContainer = styled.div`
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
  background-color: #f9f9f9;

  &:hover {
    border-color: #007bff;
  }
`;

export const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

export const UploadNote = styled.p`
  font-size: 14px;
`;

export const HiddenInput = styled.input`
  display: none;
`;
