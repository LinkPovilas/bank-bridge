import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

@Module({})
export class HttpClientModule {
  static register(options?: AxiosRequestConfig) {
    return {
      module: HttpClientModule,
      imports: [HttpModule.register(options)],
      providers: [HttpClientService],
      exports: [HttpClientService],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions) {
    return {
      module: HttpClientModule,
      imports: [HttpModule.registerAsync(options)],
      providers: [HttpClientService],
      exports: [HttpClientService],
    };
  }
}
