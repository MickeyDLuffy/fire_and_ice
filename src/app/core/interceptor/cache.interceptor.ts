/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpMethod } from '../enums/http-method';
import { CacheServiceImpl } from '../services/cache-service-impl.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheServiceImpl) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== HttpMethod.GET) {
      this.cacheService.invalidateCache();
      return next.handle(req);
    }
    const url = req.url;
    const cachedData = this.cacheService.get(url);
    if (cachedData) {
      console.log('Cache HIT.....fetching data from catch');
      return of(cachedData);
    }
    return next.handle(req).pipe(
      tap((httpEvent) => {
        if (httpEvent instanceof HttpResponse && httpEvent.ok) {
          this.cacheService.put(url, httpEvent.body);
        }
      })
    );
  }
}
