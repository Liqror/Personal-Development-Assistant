import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TodayScreenComponent} from "./components/today-screen/today-screen.component";
import {TimeComponent} from "./components/time/time.component";

@NgModule({
  declarations: [
    AppComponent,
    TodayScreenComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
