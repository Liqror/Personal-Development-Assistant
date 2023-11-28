import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";
import {BrowserModule} from "@angular/platform-browser";
import { RouterModule } from '@angular/router';

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
  exports: [              // по идеи это не нужно, но без этого не работает
    HomeComponent,
    CalendarComponent
  ],
})
export class HomeModule {}
