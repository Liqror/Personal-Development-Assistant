import {IClasses} from "../../interfaces/classes";
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnChanges {
  @Input() data: IClasses;

  ngOnChanges(changes: SimpleChanges) {
    console.log('data changes:', changes.data);
  }
}
