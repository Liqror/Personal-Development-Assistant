import { NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";
import {BrowserModule} from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild([
      { path: ':year/:month/:day', component: HomeComponent }
    ]),
    FormsModule,
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [DatePipe],
})
export class HomeModule {
}
