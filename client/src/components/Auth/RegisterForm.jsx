import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap content-center justify-center rounded-r-md bg-white"
          style={{
            width: "24rem",
            height: "32rem",
          }}
        >
          <img
            className="w-full bg-center bg-no-repeat rounded-r-md scale-125"
            src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-page-1886582-1598253.png"
          />
        </div>
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{
            width: "24rem",
            height: "32rem",
          }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Bienvenue sur Enote</h1>
            <small className="text-gray-400">Veuillez vous connecter.</small>

            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-primary hover:bg-main px-2 py-1.5 rounded-md">
                  S'inscrire
                </button>
              </div>
            </form>
            <span className="text-xs font-semibold">
                Vous avez déjà uns compte ?{" "}
                <Link to="/login" className="text-purple-700">
                    Se connecter
                </Link>
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
