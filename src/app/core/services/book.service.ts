import {Injectable} from '@angular/core';
import {merge, Observable, shareReplay, startWith, Subject, tap} from "rxjs";
import {BookFilter, BookModel} from "../models/book.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginationModel} from "../models/pagination.model";
import {equals} from "../util/compare.util";
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericService<BookModel, BookFilter>{
  protected url = '/books'


  constructor( override httpClient: HttpClient) {
    super(httpClient)
  }


}
