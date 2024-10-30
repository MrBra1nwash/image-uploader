import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UploadPage, ViewerPage } from "../src/pages";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/viewer/:filename" element={<ViewerPage />} />
        </Routes>
      </StyleSheetManager>
    </BrowserRouter>
  );
};

export default App;
