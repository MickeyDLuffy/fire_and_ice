import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HouseComponent } from '../core/house/house.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'house',
        component: HouseComponent,
      },
      {
        path: 'book',
        loadChildren: () =>
          import('../book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'character',
        title: 'fire and ice - character',
        loadChildren: () =>
          import('../character/character.module').then(
            (m) => m.CharacterModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class MainModule {}
