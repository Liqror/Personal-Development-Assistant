import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PlanComponent} from "./components/plan/plan.component";
import {TimetableComponent} from "./components/timetable/timetable.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Перенаправление на /home при открытии корневого URL
  { path: 'plans', component: PlanComponent },
  // Другие маршруты
  // Другие маршруты
  // Другие маршруты
  { path: 'timetable', component: TimetableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
