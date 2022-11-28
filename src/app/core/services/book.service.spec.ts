import {TestBed} from '@angular/core/testing';

import {BookService} from './book.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {BookModel} from "../models/book.model";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {MediaType} from "../enums/media-type";

describe('BookService', () => {
  let bookService: BookService;
  let httpController: HttpTestingController;
  let url = 'https://www.anapioficeandfire.com/api/books/2';
  const book: BookModel = {
    url: 'https://www.anapioficeandfire.com/api/books/2',
    authors: ['dluffy', 'jhey'], isbn: '978-0553103540', name: 'A Game of Thrones', numberOfPages: 345
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    }).compileComponents();
    bookService = TestBed.inject(BookService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy()
  });


  it('should find one book by url', function () {

    bookService.findOne(url).subscribe(
      actualBook => {
        expect(actualBook).withContext('No book item returned').toBeTruthy()
        expect(actualBook?.name).withContext('Incorrect name for book').toEqual('A Game of Thrones')
      }
    );
    const request = httpController.expectOne(url)
    expect(request.request.method).withContext('This must be a GET request').toEqual('GET');

    request.flush(book)

  });

  it('should get all books',  () =>{
    const url = '/books'
    bookService.findAll().subscribe(books => {
      expect(books).withContext('Books must be defined').toBeTruthy()
      expect(books.length).withContext('incorrect number of clients').toBe(1)
      expect(books.find(book => book.name === 'A Game of Thrones')?.name).toBe('A Game of Thrones')
    });
    const request = httpController.expectOne(url)
    request.flush([book])
  })
  it('should check errors for getting a book by url', function () {
    const status = 500
    const statusText = 'Internal Server error';
    const errorEvent = new ErrorEvent('Error response from fire and ice API');
    let actualError: HttpErrorResponse | undefined;

    bookService.findOne(url).subscribe(
      () => {
        fail('Subscription Error occurred. Next callback must not be invoked');
      },
      (error) => {
        actualError = error;
      },
      () => {
        fail('Entered error block. Complete callback must not be invoked');
      },
    )

    httpController.expectOne(url).error(
      errorEvent,
      { status, statusText }
    );

    if (!actualError) {
      throw new Error('Set Error message');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('should confirm if pagination is correct',  () => {
    url = '/books?page=1&pageSize=10'
    bookService.findAll({page: '1', pageSize: '10'}).subscribe(
      actualBook => {
      }
    );
    const request = httpController.expectOne(url)
     const httpRequest = request.request;
     expect( httpRequest.params.get('page')).withContext('the page  must be 1').toEqual('1')
     expect( httpRequest.params.get('pageSize')).withContext('the page sixe must be ').toEqual('10')
     expect(httpRequest.method).toBe('GET')
     expect(httpRequest.url).toBe('/books')
     // expect(httpRequest.headers.get('Accept')).withContext('The accept must be application vnd').toBe(MediaType.APPLICATION_VND_JSON)
    request.flush({ success: true });
  });

  it('should confirm if filter is correct',  () => {
    url = '/books?name=mickey'
    bookService.findAll(undefined, {name: 'mickey'}).subscribe(
      actualBook => {
      }
    );
    const request = httpController.expectOne(url)
    const httpRequest = request.request;
    expect( httpRequest.params.get('name')).withContext('filter param must be name').toEqual('mickey')

    // expect(httpRequest.headers.get('Accept')).withContext('The accept must be application vnd').toBe(MediaType.APPLICATION_VND_JSON)
    request.flush({ success: true });
  });

  afterEach(() => {
    httpController.verify();
  })
});
