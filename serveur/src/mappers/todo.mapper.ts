import { UpdateTodoInput } from '../inputs/todo.update'
import { Context } from '../entities/context'
import { Todo } from '../models/todo'

import { CreateTodoInput } from '../inputs/todo.input'

export const updateTodoFromInput = (
	id: string,
	input: UpdateTodoInput,
	context: Context,
	existingModel: Todo
) => {
	existingModel.title = input.title
	existingModel.description = input.description
	existingModel.todoId = id
	return existingModel
}

export const createTodoFromInput = (
	id: string,
	input: CreateTodoInput,
	context: Context
) => {
	const model = new Todo()
	model.title = input.title
	model.description = input.description
	model.todoId = id
	return model
}
