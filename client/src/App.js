import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import NoteViewer from "./components/Note/NoteViewer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Test />} /> */}
          <Route path="/" element={<NoteViewer />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
