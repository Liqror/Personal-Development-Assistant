import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  public currentRoute: string;
  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  ngOnInit(): void {
    
  }
  

}
