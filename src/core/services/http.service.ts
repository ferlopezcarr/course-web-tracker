import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { HTTP_STATUS_CODE_CONSTANTS } from '../constants/http-status-code-constants';
import { HTTP_ERRORS } from '../constants/http-errors';
import { HttpException } from '../models/http.exception';

@Injectable()
export class HttpService {
  private readonly FORM_CONTENT_TYPE_HEADER = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  post(
    route: string,
    data: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<any> {
    if (!route) {
      return Promise.reject(
        new HttpException(`${HTTP_ERRORS.parameterNotProvided}: route`),
      );
    }
    if (!data) {
      return Promise.reject(
        new HttpException(`${HTTP_ERRORS.parameterNotProvided}: data`),
      );
    }

    if (!!config) {
      if (!!config?.headers) {
        config.headers = {
          ...config.headers,
          ...this.FORM_CONTENT_TYPE_HEADER,
        };
      }
    }
    return axios
      .post(route, data, config)
      .then((response) => {
        console.log(response);
        console.log(response?.data);

        const isMessageSended =
          response?.status === HTTP_STATUS_CODE_CONSTANTS.ok;
        if (!isMessageSended) {
          throw new HttpException();
        }
        return isMessageSended;
      })
      .catch((error) => {
        if (error) throw new HttpException(error);
      });
  }
}
