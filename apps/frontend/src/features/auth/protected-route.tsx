import React from "react";
import { Navigate } from "react-router-dom";

import { userData } from "@/config/global";

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
  if (localStorage.getItem("status") === "loser") {
    console.log(userData.status);
    return <Navigate to="/dashboard" replace />;
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
