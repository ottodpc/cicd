import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RepositoryUtils } from './repository.utils'

import { User } from '../models/user'
import { CrudRepository } from './crud.repository.interface'
import { PagingAndSortingRepository } from './paging.sorting.repository.interface'
@Injectable()
export class UserRepository
	implements CrudRepository<User, string>, PagingAndSortingRepository<User>
{
	constructor(
		@InjectModel(User.name) public model: Model<User>,
		private readonly repositoryUtils: RepositoryUtils
	) {}

	async save(entity: User): Promise<User> {
		entity._id = entity.userId
		const modifiedModel = new this.model(entity)
		return modifiedModel.save()
	}

	async findById(id: string): Promise<User | undefined> {
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
	): Promise<User[] | undefined> {
		const filterConditions = this.repositoryUtils.filterConditionProcessor(
			filters,
			User.name
		)

		const orderByConditions =
			this.repositoryUtils.orderByConditionProcessor(sort, User.name)

		const response = await this.model
			.find(filterConditions)
			.limit(limit)
			.skip(offset)
			.sort(orderByConditions)
			.exec()
		return response
	}
}
