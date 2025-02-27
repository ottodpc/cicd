import axiosInstance from "../utils/axios";
import { CreateUserInput, LoginRequest, User } from "../types/auth.types";
import { setToken, setUser } from "../utils/localStorage";

export const login = async (credentials: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/v1/users/login", {
      username: credentials.username,
      password: credentials.password,
    });

    const user = response.data;
    if (user && user?.username) {
      const token = `dev-jwt-token-${btoa(
        JSON.stringify({
          sub: user.userId,
          username: user.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expire dans 1h
        })
      )}`;

      setToken(token);
      setUser(user);

      return { token, user };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (userData: CreateUserInput) => {
  try {
    const response = await axiosInstance.post("/v1/users", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (
  userId: string,
  userData: Partial<User>
) => {
  try {
    const response = await axiosInstance.put(`/v1/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAccount = async (userId: string) => {
  try {
    await axiosInstance.delete(`/v1/users/${userId}`);
    return true;
  } catch (error) {
    throw error;
  }
};
