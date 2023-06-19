import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import NoteViewer from "./components/Note/NoteViewer";
import RegisterForm from "./components/Auth/RegisterForm";
import { useSelector } from "react-redux";
import AuthGuard from "./components/AuthGuard";
import NoteListes from "./components/Note/NoteListes";

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
				<Route element={<LoginForm />} path="/" />
				<Route element={<LoginForm />} path="/login" />

				<Route element={<AuthGuard />}>
					<Route element={<NoteViewer />} path="/dashboard" />
          <Route element={<NoteListes />} path="/notes" />
				</Route>

			</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
