import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";
import {ClassesComponent} from "../classes/classes.component";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [
    HomeComponent,
    CalendarComponent,
    ClassesComponent,
  ],
  exports: [              // по идеи это не нужно, но без этого не работает
    HomeComponent,
    CalendarComponent,
    ClassesComponent
  ],
})
export class HomeModule {}
