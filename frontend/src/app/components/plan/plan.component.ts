import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  public currentRoute: string;

  constructor(private datePipe: DatePipe,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
    console.log('PlanComponent constructor called');
    this.route.url.subscribe(url => {
      // Проверяем, что url не пустой и имеет нужный элемент
      if (url && url.length > 1) {
        // Получение текущего маршрута
        this.currentRoute = url[1].path;
      }
    });
    // this.currentRoute = this.route.snapshot.url[1].path;
    // this.route.url.subscribe(url => {
    //   Получение текущего маршрута
      // this.currentRoute = url[1].path;
    // });
  }

  ngOnInit(): void {
    // Подписка на изменения маршрута
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Обновление текущего маршрута после завершения навигации
        this.currentRoute = this.router.url.split('/')[1];
      }
    });
  }
}
