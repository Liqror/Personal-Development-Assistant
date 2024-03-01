import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    public dates$ = new Subject<any>();

		public changeDate(dates: any) {
   		this.dates$.next(dates); 
  	}
}