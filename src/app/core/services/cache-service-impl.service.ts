import {Injectable} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CacheServiceImpl implements CacheService {
  private static requests: Map<string, HttpResponse<any>> = new Map();
  private responseSubject: BehaviorSubject<Map<string, HttpResponse<any>>> = new BehaviorSubject(new Map)
  response = this.responseSubject.asObservable();

  constructor() {
  }

  get(url: string): HttpResponse<any> | undefined {
    return CacheServiceImpl.requests.get(url);
  }

  invalidateCache(): void {
    CacheServiceImpl.requests.clear();
  }

  put(url: string, response: HttpResponse<any>): void {
    this.responseSubject.next(new Map().set(url, response))
    CacheServiceImpl.requests.set(url, response)
  }
}

export interface CacheService {
  get(url: string): HttpResponse<any> | undefined;

  put(url: string, response: HttpResponse<any>): void;

  invalidateCache(): void;
}
