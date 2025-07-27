import type { JSX } from "react";
import { Navigate } from "react-router";
import { LOGIN_PATH } from "../consts/paths";

interface ProtectedRoutesProps {
    children: JSX.Element,
};

export const ProtectedRoute = ({ children } : ProtectedRoutesProps ) => {
    const token = localStorage.getItem("token");

    return (
        <>
            {token ? children : <Navigate to={LOGIN_PATH} replace/>}
        </>
    )
}