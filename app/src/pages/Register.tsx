import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { register } from "../services/auth.service";
import { CreateUserInput } from "../types/auth.types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      form: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
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
      const userData: CreateUserInput = {
        username: formData.username,
        password: [formData.password], // Based on your API schema, password is an array
        todos: [],
      };

      await register(userData);
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrors((prev) => ({
        ...prev,
        form:
          error.response?.data?.message ||
          "L'inscription a échoué. Veuillez réessayer.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      data-testid="register-page"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inscription
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              connectez-vous à votre compte
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          data-testid="register-form"
        >
          {errors.form && (
            <div
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
              data-testid="register-error"
            >
              <p className="text-sm text-red-500">{errors.form}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
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

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              dataTestId="confirm-password-input"
            />
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              dataTestId="register-button"
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
