import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PlanComponent} from "./components/plan/plan.component";
import {TimetableComponent} from "./components/timetable/timetable.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plans', component: PlanComponent },
  { path: 'timetable', component: TimetableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
