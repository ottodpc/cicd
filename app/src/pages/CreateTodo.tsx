import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { CreateTodoInput } from "../types/todo.types";
import { createTodo } from "../services/todo.service";

const CreateTodo: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: CreateTodoInput) => {
    setIsLoading(true);
    setError("");

    try {
      await createTodo(data);
      navigate("/todos");
    } catch (error: any) {
      console.error("Failed to create todo:", error);
      setError(
        error.response?.data?.message ||
          "Impossible de créer le todo. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-testid="create-todo-page">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Créer un Todo</h1>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
            data-testid="create-todo-error"
          >
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <TodoForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CreateTodo;
