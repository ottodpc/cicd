import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";
import { isAuthenticated } from "./utils/localStorage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/todos" replace />;
  }

  return <>{children}</>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/todos",
    element: (
      <ProtectedRoute>
        <TodoList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/todos/create",
    element: (
      <ProtectedRoute>
        <CreateTodo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/todos/:todoId/edit",
    element: (
      <ProtectedRoute>
        <UpdateTodo />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
