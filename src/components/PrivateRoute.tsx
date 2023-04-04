﻿import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContextProvider";

type Props = {
	children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
	const { token } = React.useContext(AuthContext);
	const location = useLocation();

	return token ? children : <Navigate to={"/"} state={location.pathname} />;
};

export default PrivateRoute;