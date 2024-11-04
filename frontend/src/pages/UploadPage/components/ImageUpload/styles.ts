import styled from "styled-components";

export const UploadContainer = styled.div<{ isDragging: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  min-height: 300px;
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

export const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ViewImageButtonContainer = styled.div`
  max-width: 250px;
  margin: 0 20px;
`;
