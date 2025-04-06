import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const GameProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userData_storage = JSON.parse(
    String(localStorage.getItem("student_info")),
  );

  if (!userData_storage) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const RegisterProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userData_storage = JSON.parse(
    String(localStorage.getItem("student_info")),
  );

  if (userData_storage) {
    return <Navigate to="/game" replace />;
  }

  return children;
};
