export interface Todo {
  todoId: string;
  title: string;
  description: string;
  _id?: string;
}

export interface CreateTodoInput {
  title: string;
  description: string;
}

export interface UpdateTodoInput {
  title: string;
  description: string;
}

export interface PageInfo {
  limit: number;
  offset: number;
}

export interface PagedResponse<T> {
  results: T[];
  pageInfo: PageInfo;
}
