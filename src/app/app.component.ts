import { Component } from '@angular/core';
import {TestService} from "./core/services/test.service";
import {BookService} from "./core/services/book.service";
import {HouseService} from "./core/services/house.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fire_and_ice';
  constructor(private t: TestService, private bookService: BookService, private hs: HouseService) {

    this.bookService.findOne('https://www.anapioficeandfire.com/api/books/1').subscribe(a => console.log('findone'))
    this.bookService.findAll().subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll().subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll({page:'1',pageSize:'20'}).subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll().subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll().subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll(undefined, {name: 'A Clash of Kings'}).subscribe(a => console.log(a, '2332323'))
    this.bookService.findAll().subscribe(a => console.log(a, '2332323'))

    this.hs.findAll().subscribe(a => console.log(a, 'houses'))
  }
}
