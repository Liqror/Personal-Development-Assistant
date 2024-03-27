import { Component } from '@angular/core';
import {IPlan} from "../../interfaces/plan";
import { PlanService } from 'src/app/services/plan.service';
declare function openPlan(): void;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  myScriptElement: HTMLScriptElement;

  plans: IPlan[]; // Предполагается, что планы будут массивом объектов. Используйте конкретный тип данных, если он у вас есть


  constructor(private planService: PlanService) {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit() {
    this.getPlans();
  }

  getPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        console.log(this.plans);
      },
      error: (error) => console.error(error),
    });
  }
}
