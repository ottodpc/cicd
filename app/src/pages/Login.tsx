import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/auth.service";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { username: "", password: "", form: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      const { user } = await login({
        username: formData.username,
        password: formData.password,
      });
      if (user) {
        navigate("/todos");
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Échec de la connexion. Veuillez vérifier vos identifiants.",
        }));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        form:
          error.response?.data?.message ||
          "Échec de la connexion. Veuillez vérifier vos identifiants.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8"
      data-testid="login-page"
    >
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Ou{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              créez un compte
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          data-testid="login-form"
        >
          {errors.form && (
            <div
              className="p-4 mb-4 border-l-4 border-red-500 bg-red-50"
              data-testid="login-error"
            >
              <p className="text-sm text-red-500">{errors.form}</p>
            </div>
          )}

          <div className="-space-y-px rounded-md shadow-sm">
            <Input
              id="username"
              name="username"
              type="text"
              label="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
              dataTestId="username-input"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              dataTestId="password-input"
            />
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              dataTestId="login-button"
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
