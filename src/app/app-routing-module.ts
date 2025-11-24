import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewItemAddPage } from './pages/new-item-add-page/new-item-add-page';

const routes: Routes = [
  {path: '', component: Home},
  {path: 'add', component: NewItemAddPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
