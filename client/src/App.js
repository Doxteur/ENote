import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import NoteViewer from "./components/Note/NoteViewer";
import RegisterForm from "./components/Auth/RegisterForm";
import { useSelector } from "react-redux";

function App() {
  // check if user is logged in
  // if not, redirect to login page

  const auth = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    console.log("auth", auth);
    if (!auth?.token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Test />} /> */}
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NoteViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegisterForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
