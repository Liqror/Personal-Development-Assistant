import {Component} from '@angular/core'
import { OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  currentDate: Date;
  data: IHomeData;
  ngOnInit(): void {
    this.currentDate = new Date();
    this.getHomeData();
  }

  // Взаимодействие с бд
  constructor(private http: HttpClient) {
    this.getHomeData();
  }
  getHomeData(): void {
    this.http.get<IHomeData>('http://localhost:8080/assistant/home').subscribe((res: IHomeData) => {
      // console.log('res', res);
      this.data = res;
    });
  }
}
