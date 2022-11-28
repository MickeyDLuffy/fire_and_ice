import {Injectable} from '@angular/core';
import {find, Observable, shareReplay, switchMap} from "rxjs";
import {PaginationModel} from "../models/pagination.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {equals} from "../util/compare.util";
import {HasUrlModel} from "../models/has-url.model";

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T extends HasUrlModel, D> {
  protected abstract url: string
  private entities$!: Observable<T[]>;
  private currPagination!: PaginationModel | undefined;
  private currFilter!: D | undefined;

  protected constructor(protected httpClient: HttpClient) {
  }

  public findAll(pagination?: PaginationModel, filter?: D): Observable<T[]> {
    if (!this.entities$ || !this.hasPaginationChanged(pagination, filter)) {
      this.currPagination = pagination
      this.currFilter = filter
      this.entities$ = this.fromApi(pagination, filter);
    }
    return this.entities$;
  }

  public findOne(url: string): Observable<T | undefined> {
    if (!this.entities$) {
      return this.findOneFromApi(url);
    }
    return this.entities$.pipe(
      switchMap(entity => entity),
      find(entities => entities?.url === url)
    )
  }

  private hasPaginationChanged(pagination?: PaginationModel, filter?: D): boolean {
    const isEqual = equals(pagination, this.currPagination);
    const isFilterEqual = equals(filter, this.currFilter);
    return isEqual && isFilterEqual;
  }

  private fromApi(pagination?: PaginationModel, filter?: D): Observable<T[]> {
    const params = new HttpParams({fromObject: {...pagination, ...filter}})
    return this.httpClient.get<T[]>(this.url, {params})
      .pipe(shareReplay(1))
  }

  private findOneFromApi(url: string): Observable<T> {
    return this.httpClient.get<T>(url)
  }
}
