import { Injectable } from '@nestjs/common';
import { DefaultHttpService } from './default.http.service';

@Injectable()
export class DefaultService {
  constructor(private readonly httpService: DefaultHttpService) {}
}
