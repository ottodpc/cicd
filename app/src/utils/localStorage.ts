export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const clearAuth = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
