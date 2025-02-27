import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { CreateTodoInput, Todo } from "../types/todo.types";

interface TodoFormProps {
  initialData?: Todo;
  onSubmit: (data: CreateTodoInput) => void;
  isLoading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateTodoInput>({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const newErrors = { title: "", description: "" };

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="todo-form">
      <Input
        id="title"
        name="title"
        label="Titre"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
        dataTestId="todo-title-input"
      />

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          data-testid="todo-description-input"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          dataTestId="todo-submit-button"
        >
          {isLoading
            ? "Chargement..."
            : initialData
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
