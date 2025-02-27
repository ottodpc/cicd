import { Injectable } from '@nestjs/common'
import axios from '@nestjs/axios'
import { DefaultHttpService } from './default.http.service'

@Injectable()
export class DefaultService {
	constructor(private readonly httpService: DefaultHttpService) {}
}
