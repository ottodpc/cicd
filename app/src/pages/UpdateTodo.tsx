import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { UpdateTodoInput, Todo } from "../types/todo.types";
import { getTodoById, updateTodo } from "../services/todo.service";

const UpdateTodo: React.FC = () => {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      if (!todoId) return;

      setIsFetching(true);
      try {
        const data = await getTodoById(todoId);
        setTodo(data);
      } catch (error) {
        console.error("Failed to fetch todo:", error);
        setError("Impossible de charger le todo. Veuillez réessayer.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (data: UpdateTodoInput) => {
    if (!todoId) return;

    setIsLoading(true);
    setError("");

    try {
      await updateTodo(todoId, data);
      navigate("/todos");
    } catch (error: any) {
      console.error("Failed to update todo:", error);
      setError(
        error.response?.data?.message ||
          "Impossible de mettre à jour le todo. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-8 text-center"
        data-testid="loading-indicator"
      >
        <svg
          className="animate-spin h-8 w-8 text-blue-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-testid="update-todo-page">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Modifier le Todo
        </h1>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
            data-testid="update-todo-error"
          >
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {todo && (
          <TodoForm
            initialData={todo}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateTodo;
