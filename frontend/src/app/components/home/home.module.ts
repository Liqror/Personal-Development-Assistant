import { NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeComponent} from "./home.component";
import {BrowserModule} from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {PlanComponent} from "../plan/plan.component";
import {TimetableComponent} from "../timetable/timetable.component";

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
    CalendarComponent,
    SideMenuComponent,
    PlanComponent,
    TimetableComponent
  ],
  exports: [
    HomeComponent,
    CalendarComponent,
    SideMenuComponent,
    PlanComponent,
    TimetableComponent
  ],
  providers: [DatePipe],
})
export class HomeModule {
}
