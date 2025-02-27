import { Todo } from "./todo.types";

export interface User {
  userId: string;
  username: string;
  todos: Todo[];
  _id?: string;
}

export interface CreateUserInput {
  username: string;
  password: string[];
  todos: Todo[];
}

export interface UpdateUserInput {
  username: string;
  password: string[];
  todos: Todo[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Context {
  userContext: {
    userId: string;
  };
  isAuthenticated: boolean;
}
