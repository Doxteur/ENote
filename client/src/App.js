import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import NoteViewer from "./components/Note/NoteViewer";
import RegisterForm from "./components/Auth/RegisterForm";
import { useSelector } from "react-redux";
import AuthGuard from "./components/AuthGuard";
import NoteListes from "./components/Note/NoteListes";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginForm />} path="/" />
          <Route element={<LoginForm />} path="/login" />

          <Route element={<AuthGuard />}>
            <Route element={<NoteListes />} path="/notes" />
            <Route element={<NoteViewer />} path="/note/:id" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
