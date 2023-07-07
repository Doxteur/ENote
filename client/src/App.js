import { Route, Routes, HashRouter } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import AuthGuard from "./components/AuthGuard";
import NoteListes from "./components/Note/NoteListes";
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
