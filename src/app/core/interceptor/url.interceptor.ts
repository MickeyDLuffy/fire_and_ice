import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {EnvironmentServiceImpl} from "../../../environments/environment-service-impl.service";

@Injectable()
export class UrlInterceptor implements HttpInterceptor{
  constructor(private envService: EnvironmentServiceImpl) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url
    if(!this.isFullUrl((req.url))) {
      url = `${this.envService.baseUri}${req.url}`;
    }
    const cloneReq =  req.clone({
       url
     })
    return next.handle(cloneReq);
  }

  private isFullUrl(url: string): boolean {
     return url.includes(this.envService.baseUri);
  }

}
