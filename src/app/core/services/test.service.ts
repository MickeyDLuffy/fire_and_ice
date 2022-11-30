import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentServiceImpl } from '../../../environments/environment-service-impl.service';
import { BehaviorSubject } from 'rxjs';
/* eslint-disable  @typescript-eslint/no-explicit-any */
@Injectable({
  providedIn: 'root',
})
export class TestService {
  private charactersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly envService: EnvironmentServiceImpl
  ) {}
}
