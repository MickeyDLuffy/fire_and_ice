import {Injectable} from '@angular/core';
import {BookFilter, BookModel} from "../models/book.model";
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericService<BookModel, BookFilter> {
  protected url = '/books'

  constructor(override httpClient: HttpClient) {
    super(httpClient)
  }
}
