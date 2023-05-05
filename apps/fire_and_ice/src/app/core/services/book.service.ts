import { Injectable } from '@angular/core';
import { BookFilter, BookModel } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { of, zipWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService extends GenericService<BookModel, BookFilter> {
  protected url = '/books';

  constructor(override httpClient: HttpClient) {
    const firstObservable = of('hello');
    const secondObservable = of('world');
    const thirdObservable = of('!');
    const fourthObservable = of('RxJS');

    const combinedObservable = firstObservable.pipe(
      zipWith(
        secondObservable,
        thirdObservable,
        fourthObservable,
        (firstValue, secondValue, thirdValue, fourthValue) =>
          `${firstValue} ${secondValue}${thirdValue} with ${fourthValue}`
      )
    );
    super(httpClient);
  }
}
