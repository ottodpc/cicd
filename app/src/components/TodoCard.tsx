import React from "react";
import { Link } from "react-router-dom";
import { Todo } from "../types/todo.types";
import Button from "./Button";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
      data-testid={`todo-${todo.todoId}`}
    >
      <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
      <p className="text-gray-600 mb-4">{todo.description}</p>
      <div className="flex justify-end space-x-2">
        <Link to={`/todos/${todo.todoId}/edit`}>
          <Button variant="secondary" dataTestId={`edit-todo-${todo.todoId}`}>
            Modifier
          </Button>
        </Link>
        <Button
          variant="danger"
          onClick={() => onDelete(todo.todoId)}
          dataTestId={`delete-todo-${todo.todoId}`}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
