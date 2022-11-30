/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentServiceImpl } from '../../../environments/environment-service-impl.service';
import { Injectable } from '@angular/core';
import { HttpHeader } from '../enums/http-header';
import { MediaType } from '../enums/media-type';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private envService: EnvironmentServiceImpl) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header = req.clone({ headers: this.newHeader() });
    return next.handle(header);
  }

  private newHeader(): HttpHeaders {
    const accept = `${MediaType.APPLICATION_VND_JSON}; version=${this.envService.version}`;
    return new HttpHeaders()
      .set(HttpHeader.CONTENT_TYPE, MediaType.APPLICATION_JSON)
      .set(HttpHeader.ACCEPT, accept)
      .set(HttpHeader.CACHE_CONTROL, '')
      .set(HttpHeader.IF_NONE_MATCH, '*')
      .set(HttpHeader.IF_MODIFIED_SINCE, new Date().toString())
      .set('x-test-header', 'th Emperor is ');
  }
}
