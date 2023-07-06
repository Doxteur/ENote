import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/Auth/AuthReducer";

function LoginForm() {
  const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: e.target[0].value, password: e.target[1].value }))
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem("token", JSON.stringify(auth.token));
      navigate("/notes");
    }
  }, [auth]);


  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{
            width: "24rem",
            height: "32rem",
          }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Content de vous revoir !</h1>
            <small className="text-gray-400">Veuillez vous connecter.</small>
            <form
              className="mt-4"
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  className="bg-white block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="bg-white block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3 flex flex-wrap content-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-1 checked:bg-purple-700"
                />{" "}
                <label
                  htmlFor="remember"
                  className="mr-auto text-xs font-semibold text-black"
                >
                  Se souvenir de moi
                </label>
                <a href="/" className="text-xs font-semibold text-primary">
                  Mot de passe oublié ?
                </a>
              </div>

              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-primary px-2 py-1.5 rounded-md">
                  Se connecter
                </button>
                {auth.error && <div className="text-red-500 font-bold">{auth.error}</div>}
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Pas de compte ?
              </span>
              {/* <a href="#" className="text-xs font-semibold text-purple-700"> */}
              <Link
                to="/register"
                className="text-xs font-semibold text-primary"
              >
                S'inscrire
              </Link>
              {/* </a> */}
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap content-center justify-center rounded-r-md bg-white"
          style={{
            width: "24rem",
            height: "32rem",
          }}
        >
          <img
            className="w-full  bg-center bg-no-repeat rounded-r-md"
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
