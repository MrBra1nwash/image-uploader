import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UploadPage, ViewerPage } from "../src/pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/viewer/:filename" element={<ViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
