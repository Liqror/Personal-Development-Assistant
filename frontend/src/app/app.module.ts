import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HomeModule } from "./components/home/home.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BalanceWheelComponent } from './components/balance-wheel/balance-wheel.component';
import { CalendarComponent } from "./components/calendar/calendar.component";
import { PlanComponent } from "./components/plan/plan.component";
import { TimetableComponent } from "./components/timetable/timetable.component";
import { DiaryComponent } from './components/diary/diary.component';
import { AccountComponent } from './components/account/account.component';
import { StorageComponent } from './components/storage/storage.component';


@NgModule({
  declarations: [
    AppComponent,
    BalanceWheelComponent,
    CalendarComponent,
    PlanComponent,
    TimetableComponent,
    DiaryComponent,
    AccountComponent,
    StorageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  exports: [
    CalendarComponent,
    PlanComponent,
    TimetableComponent,
    DiaryComponent,
    AccountComponent,
    StorageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRu, 'ru');
  }
}
