import { RoleEnum } from "@/common/role.enum";
import { User } from "@/redux/reducers/userReducer";
import React from "react";
import { Navigate } from "react-router-dom";

export interface ProtectedRouteParams {
  user: User;
}

export const ProtectedRoute: React.FC<ProtectedRouteParams> = ({ user, children }) => (
  <>{user.authorized ? children : <Navigate to="/sign-in" replace />}</>
);

export const UnprotectedRoute: React.FC<ProtectedRouteParams> = ({ user, children }) => (
  <>{user?.authorized ? <Navigate to="/" replace /> : children}</>
);

export const AdminRoute: React.FC<ProtectedRouteParams> = ({ user, children }) => (
  <>{user.role === RoleEnum.Admin ? children : <Navigate to="/not-authorized" replace />}</>
);
