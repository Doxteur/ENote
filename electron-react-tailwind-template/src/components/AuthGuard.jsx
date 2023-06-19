// import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const AuthGuard = () => {

	// const auth = useSelector((state) => state.auth);
	const token = JSON.parse(localStorage.getItem("token"));
	const auth = { isAuthenticated: true, token: token };

	// ne pas oublier de reactiver la verification de l'authentification
	return ( auth.isAuthenticated && token ? <Outlet /> : <Navigate to="/login" /> );
	// return (token ? <Outlet /> : <Navigate to="/login" /> );

};

export default AuthGuard;
