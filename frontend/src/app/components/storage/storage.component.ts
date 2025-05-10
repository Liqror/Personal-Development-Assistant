import { Component } from '@angular/core';


@Component({
  selector: 'storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {
  // Фильтры
  filter = {
    tasks: false,
    notes: false,
    diaries: false,
    plans: false,
  };

  // для плана и задачи
  isCompleted: boolean = false;
  startDate: string;
  startTime: string;
  title: string; 
  estimate: number = 0;
  description: string; 
  
  // для задачи
  stopDate: string;
  stopTime: string;
  havePlan: boolean = false;
  isRepeat: boolean = false;

  // для плана
  statusPlan: boolean = false;

  // для заметки и дневника
  text: string;
  createDate: string;


  // категории - список полученый с бекенда

}

