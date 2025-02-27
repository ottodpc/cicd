import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import Button from "../components/Button";
import { getTodos, deleteTodo } from "../services/todo.service";
import { PagedResponse, Todo } from "../types/todo.types";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageInfo, setPageInfo] = useState({ limit: 10, offset: 0 });
  const [hasMore, setHasMore] = useState(false);

  const fetchTodos = async (offset = 0) => {
    setIsLoading(true);
    setError("");

    try {
      const response: PagedResponse<Todo> = await getTodos(
        "",
        "",
        pageInfo.limit,
        offset
      );

      if (offset === 0) {
        setTodos(response.results);
      } else {
        setTodos((prev) => [...prev, ...response.results]);
      }

      setPageInfo(response.pageInfo);
      setHasMore(response.results.length === pageInfo.limit);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      setError("Impossible de charger les todos. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLoadMore = () => {
    fetchTodos(pageInfo.offset + pageInfo.limit);
  };

  const handleDelete = async (todoId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche?")) {
      try {
        await deleteTodo(todoId);
        setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
      } catch (error) {
        console.error("Failed to delete todo:", error);
        setError("Impossible de supprimer la tâche. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-testid="todo-list-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Todos</h1>
        <Link to="/todos/create">
          <Button dataTestId="create-todo-button">Créer un Todo</Button>
        </Link>
      </div>

      {error && (
        <div
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
          data-testid="todo-list-error"
        >
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {isLoading && todos.length === 0 ? (
        <div className="text-center py-12" data-testid="loading-indicator">
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
      ) : todos.length === 0 ? (
        <div
          className="text-center py-12 bg-gray-50 rounded-lg"
          data-testid="empty-todo-list"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun todo pour le moment
          </h3>
          <p className="text-gray-500 mb-4">
            Commencez par créer votre premier todo!
          </p>
          <Link to="/todos/create">
            <Button>Créer un Todo</Button>
          </Link>
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoCard key={todo.todoId} todo={todo} onDelete={handleDelete} />
          ))}

          {hasMore && (
            <div className="mt-6 text-center">
              <Button
                variant="secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
                dataTestId="load-more-button"
              >
                {isLoading ? "Chargement..." : "Charger plus"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
