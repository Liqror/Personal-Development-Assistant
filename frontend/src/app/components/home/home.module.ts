import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";
import {BrowserModule} from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: ':year/:month/:day', component: HomeComponent }
    ])
  ],
  declarations: [
    HomeComponent,
    CalendarComponent
  ],
  exports: [
    HomeComponent,
    CalendarComponent
  ],
  providers: [DatePipe],
})
export class HomeModule {
}
