import axiosInstance from "../utils/axios";
import {
  CreateTodoInput,
  PagedResponse,
  Todo,
  UpdateTodoInput,
} from "../types/todo.types";

export const getTodos = async (
  filters = "",
  sortFields = "",
  limit = 10,
  offset = 0
) => {
  try {
    const response = await axiosInstance.get<PagedResponse<Todo>>("/v1/todos", {
      params: {
        filters,
        sortFields,
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodoById = async (todoId: string) => {
  try {
    const response = await axiosInstance.get<Todo>(`/v1/todos/${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todoData: CreateTodoInput) => {
  try {
    const response = await axiosInstance.post<Todo>("/v1/todos", todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todoId: string, todoData: UpdateTodoInput) => {
  try {
    const response = await axiosInstance.put<Todo>(
      `/v1/todos/${todoId}`,
      todoData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    await axiosInstance.delete(`/v1/todos/${todoId}`);
    return true;
  } catch (error) {
    throw error;
  }
};
