import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DefaultHttpService } from './default.http.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { OnModuleInit } from '@nestjs/common';
@Module({
  controllers: [],
  providers: [
    {
      provide: DefaultHttpService,
      useExisting: HttpService,
    },
  ],
  imports: [HttpModule],
  exports: [DefaultHttpService],
})
export class DefaultApiModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.defaults.baseURL = this.configService.get(
      'rest.default.baseurl',
    );
    this.httpService.axiosRef.defaults.timeout = this.configService.get(
      'rest.default.timeout',
    );

    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.headers.set('Content-Type', `application/json`);

      return config;
    });
  }
}
