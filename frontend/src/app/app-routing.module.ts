import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PlanComponent} from "./components/plan/plan.component";
import {TimetableComponent} from "./components/timetable/timetable.component";
import {BalanceWheelComponent} from "./components/balance-wheel/balance-wheel.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plans', component: PlanComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'balance-wheel', component: BalanceWheelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
