import {HttpHeaderInterceptor} from "./http-header.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CacheInterceptor} from "./cache.interceptor";
import {UrlInterceptor} from "./url.interceptor";

export const INTERCEPTORS = [ {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpHeaderInterceptor,
  multi: true
}, {
  provide: HTTP_INTERCEPTORS,
  useClass: CacheInterceptor,
  multi: true
}, {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true
}]
