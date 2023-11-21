import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";


@NgModule({
  imports: [
    CommonModule,
    // CalendarComponent
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
