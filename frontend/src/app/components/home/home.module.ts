import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from "./home.component";
import { BrowserModule} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    DatePipe,
  ],
})
export class HomeModule {
}
