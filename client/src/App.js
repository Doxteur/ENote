import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate, HashRouter } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import NoteViewer from "./components/Note/NoteViewer";
import RegisterForm from "./components/Auth/RegisterForm";
import { useSelector } from "react-redux";
import AuthGuard from "./components/AuthGuard";
import NoteListes from "./components/Note/NoteListes";
import EditorWiz from "./components/Note/Editor/EditorWiz";
import Editor from "./components/Note/Editor/Editor";

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route element={<LoginForm />} path="/" />
          <Route element={<LoginForm />} path="/login" />

          <Route element={<AuthGuard />}>
            <Route element={<NoteListes />} path="/notes" />
            <Route element={<Editor />} path="/note/:id" />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
