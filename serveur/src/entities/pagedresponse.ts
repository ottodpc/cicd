import { PageInfo } from './pageinfo'

export class PagedResponse {
	results: any[]

	pageInfo: PageInfo

	constructor(results: any[], pageInfo: PageInfo) {
		this.results = results
		this.pageInfo = pageInfo
	}
}
