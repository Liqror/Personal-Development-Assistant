import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { PlanComponent } from "./components/plan/plan.component";
import { TimetableComponent } from "./components/timetable/timetable.component";
import { BalanceWheelComponent } from "./components/balance-wheel/balance-wheel.component";
import { DiaryComponent } from './components/diary/diary.component';
import { AccountComponent } from './components/account/account.component';
import { StorageComponent } from './components/storage/storage.component';
import { PhrasesComponent } from './components/phrases/phrases.component';
import { MemoriaComponent } from './components/memoria/memoria.component'


const routes: Routes = [
  // Редирект с пустого URL на текущую дату
  { 
    path: '', 
    redirectTo: getCurrentDateUrl(), 
    pathMatch: 'full' 
  },
  // Динамический путь для конкретной даты
  { 
    // path: ':year/:month/:day', 
    path: ':year(\\d{4})/:month(0[1-9]|1[0-2])/:day(0[1-9]|[12][0-9]|3[01])',
    component: HomeComponent 
  },
  { path: 'plans', component: PlanComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'balance-wheel', component: BalanceWheelComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'account', component: AccountComponent }, 
  { path: 'storage', component: StorageComponent },
  { path: 'phrases', component: PhrasesComponent },
  { path: 'memoria', component: MemoriaComponent },
  
  // 404 страница
  { 
    path: '**', 
    redirectTo: '' 
  },
];

// Эта функция генерирует URL для текущей даты
export function getCurrentDateUrl(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
