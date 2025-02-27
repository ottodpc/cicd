import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RepositoryUtils } from './repository.utils'

import { Todo } from '../models/todo'
import { CrudRepository } from './crud.repository.interface'
import { PagingAndSortingRepository } from './paging.sorting.repository.interface'
@Injectable()
export class TodoRepository
	implements CrudRepository<Todo, string>, PagingAndSortingRepository<Todo>
{
	constructor(
		@InjectModel(Todo.name) public model: Model<Todo>,
		private readonly repositoryUtils: RepositoryUtils
	) {}

	async save(entity: Todo): Promise<Todo> {
		entity._id = entity.todoId
		const modifiedModel = new this.model(entity)
		return modifiedModel.save()
	}

	async findById(id: string): Promise<Todo | undefined> {
		const existingModel = await this.model.findById(id)
		return existingModel
	}

	async deleteById(id: string): Promise<void> {
		await this.model.findByIdAndDelete(id)
	}

	async findAll(
		filters: string,
		sort: string,
		limit: number,
		offset: number
	): Promise<Todo[] | undefined> {
		const filterConditions = this.repositoryUtils.filterConditionProcessor(
			filters,
			Todo.name
		)

		const orderByConditions =
			this.repositoryUtils.orderByConditionProcessor(sort, Todo.name)

		const response = await this.model
			.find(filterConditions)
			.limit(limit)
			.skip(offset)
			.sort(orderByConditions)
			.exec()
		return response
	}
}
