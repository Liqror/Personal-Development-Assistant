import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";
import {DatePipe} from "@angular/common";
import { format } from 'date-fns';
import localeRu from 'date-fns/locale/ru';
import {ActivatedRoute, NavigationEnd, Route, Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  showContent = true;
  currentDate: Date;
  data: IHomeData;
  yesterdayLabel: string = 'вчера';
  todayLabel: string = 'сегодня';
  tomorrowLabel: string = 'завтра';
  isDateClicked: boolean = false;
  public currentRoute: string;


  constructor(private datePipe: DatePipe,
              private http: HttpClient,
              private router: Router){
    // this.route.url.subscribe(url => {
      // Получение текущего маршрута
      // this.currentRoute = url[0].path;
    // });
    // this.currentRoute = this.route.snapshot.url[0].path;
    // console.log('Current Route:', this.currentRoute);
  }

  goToPlans() {
    this.router.navigate(['/plans']);
  }






  goToTimetable() {
    this.router.navigate(['/timetable']);
  }



  // private subscribeToNavigationEvents(): void {
  //   // Подписка на событие завершения навигации
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Проверка текущего маршрута и установка showContent
  //       this.showContent = event.urlAfterRedirects === '/';
  //     }
  //   });
  // }

  ngOnInit(): void {
    // Подписка на изменения маршрута
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Обновление текущего маршрута после завершения навигации
        this.currentRoute = this.router.url.split('/')[1];
        console.log('Current Route:', this.currentRoute);
      }
    });

    this.currentDate = new Date();
    // Вызываем загрузку данных
    this.getHomeData();
  }

  handleDateClicked(eventData: any) {
    console.log(eventData)
    this.yesterdayLabel = this.formatDate(eventData.previous);
    this.todayLabel = this.formatDate(eventData.clicked);
    this.tomorrowLabel = this.formatDate(eventData.next);

    this.isDateClicked = true;
  }
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  getHomeData(): void {
    this.http.get<IHomeData>('http://localhost:8080/assistant/home').subscribe((res: IHomeData) => {
      this.data = res;
    });
  }

  // private formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   return format(date, 'dd MMM yyyy', { locale: require('date-fns/locale/ru') });
  // }

  // private formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   return this.datePipe.transform(date, 'dd MMM yyyy') || '';
  // }

}
