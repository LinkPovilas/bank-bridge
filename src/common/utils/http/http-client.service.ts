import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { Observable, map, catchError } from 'rxjs';
import { HttpMethod } from './enums/http-method.enum';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpService.name);

  constructor(private readonly httpService: HttpService) {}

  get<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.request<T>({ ...config, method: HttpMethod.GET, url });
  }

  post<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      ...config,
      method: HttpMethod.POST,
      url,
    });
  }

  put<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.request<T>({ ...config, method: HttpMethod.PUT, url });
  }

  patch<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      ...config,
      method: HttpMethod.PATCH,
      url,
    });
  }

  delete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.request<T>({ ...config, method: HttpMethod.DELETE, url });
  }

  private request<T>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    this.logger.log({
      message: 'Outgoing request',
      external: {
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.data,
      },
    });

    return this.httpService.request<T>(config).pipe(
      map((response) => {
        this.logger.log({
          message: 'Incoming response',
          status: response.status,
          external: {
            headers: response.headers,
            response: response.data,
          },
        });

        return response;
      }),
      catchError((error: AxiosError) => {
        this.logger.error({
          message: 'Incoming error response',
          status: error.response?.status,
          external: {
            headers: error.response?.headers,
            response: error.response?.data,
          },
        });

        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
