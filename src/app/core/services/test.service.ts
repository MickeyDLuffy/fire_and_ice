import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentServiceImpl} from "../../../environments/environment-service-impl.service";
import {PaginationModel} from "../models/pagination.model";
import {BehaviorSubject, shareReplay, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private charactersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private readonly httpClient: HttpClient,
              private readonly envService: EnvironmentServiceImpl) {
  }

  getRandom() {
    const pag: PaginationModel = {page: '1', pageSize: '20'}
    const params = new HttpParams({fromObject: {...pag}})
    if (this.charactersSubject.value) {
      console.log('has data')
      return this.characters$;
    } else {
      return this.httpClient.get('/characters/1').pipe(
        tap(c => this.charactersSubject.next(c)),
        shareReplay()
      )
    }
  }
}
