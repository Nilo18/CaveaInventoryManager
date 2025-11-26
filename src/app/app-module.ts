import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './pages/home/home';
import { Items } from './components/items/items';
import { NewItemAddPage } from './pages/new-item-add-page/new-item-add-page';
import { StatisticsModal } from './components/statistics-modal/statistics-modal';
import { MatIconModule } from '@angular/material/icon';
import { Pagination } from './components/pagination/pagination';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    App,
    Home,
    Items,
    NewItemAddPage,
    StatisticsModal,
    Pagination
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
