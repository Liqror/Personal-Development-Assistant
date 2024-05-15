import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {wheel} from '../../data/wheel'
import {IWheel, IWheelData} from "../../interfaces/wheel";
import {ICategory, ICategoryForCreate} from "../../interfaces/category"
import {HttpClient} from "@angular/common/http";
import { CategoryService } from 'src/app/services/category.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-balance-wheel',
  templateUrl: './balance-wheel.component.html',
  // template: '<canvas #balanceWheelCanvas width="510" height="510"></canvas>',
  styleUrls: ['./balance-wheel.component.css']
})
export class BalanceWheelComponent implements OnInit {

  wheelData: IWheel[];
  categories: ICategory[];
  
  // для создания новой категории
  newCategory: ICategoryForCreate = {
    user_id: 1,
    title: '',
    color: '',
    active: true
  };

  // для создания новой категории
  changeCategory: ICategory;

  // для получения колеса баланса
  start: string;
  stop: string;

  @ViewChild('balanceWheelCanvas', {static: true}) balanceWheelCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(private http: HttpClient,
    private categoryService: CategoryService) {}

  ngOnInit() {
    // Присвойте данные колеса переменной wheelData
    this.wheelData = wheel.wheel;
    this.getCategories();

    this.ctx = this.balanceWheelCanvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawCircle();
    }
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((res: ICategory[]) => { 
      this.categories = res;
    });
  }

  createCategory(): void {
    // Вызовите сервис для создания новой категории и передайте новую категорию
    this.categoryService.createCategory(this.newCategory).subscribe(
      createdCategory => {
        console.log('Категория успешно создана:', createdCategory);
      },
      error => {
        console.error('Ошибка при создании категории:', error);
      }
    );
  }

  // это пока работает только с галочками, нужно чтоб работало с названием и цветом
  updateCategory(category: ICategory): void {
    this.categoryService.updateCategory(category).subscribe(updatedCategory => {
        console.log('Категория успешно обновлена:', updatedCategory);
    }, error => {
        console.error('Ошибка при обновлении категории:', error);
    });
  }

  // рисование колеса
  drawCircle() {
    if (!this.ctx) {
      return;
    }

    // Получить количество элементов в массиве
    const numberOfElements = this.wheelData.length;
    const centerX = this.balanceWheelCanvas.nativeElement.width / 2;
    const centerY = this.balanceWheelCanvas.nativeElement.height / 2;
    const radius = 250;
    let innerRadius = radius;  // Радиус внутренних кругов



    //Поиск самой большой суммы баллов среди всех категорий или иначе говоря самой дорогой категории
    let max_point = 0;
    for (let i = 0; i < numberOfElements; i++) {
      if (max_point <  this.wheelData[i].points) {
        max_point = this.wheelData[i].points;
      }
    }
    // console.log(`max points in all categories -----  ${max_point}`);
    const numCircles = 10; //рисуем всегда 10 внутренних кругов. 10 круг - 100%.

    // Нарисовать внешний круг
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // Нарисовать внутренние круги
    for (let i = 0; i < numCircles; i++) {
      innerRadius = innerRadius - radius / numCircles;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
    }

    // Нарисовать точку в центре большого круга
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI); // Радиус 2 для точки
    this.ctx.fillStyle = 'black'; // Цвет точки
    this.ctx.fill();

    // Рисование n линий радиуса через равное расстояние
    const numberOfLines = numberOfElements; // Задайте желаемое количество линий
    const angleIncrement = (2 * Math.PI) / numberOfLines;

    // Угол для верхней части круга
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numberOfLines; i++) {
      const currentAngle = startAngle + i * angleIncrement;
      const xOnOuterCircle = centerX + Math.cos(currentAngle) * radius;
      const yOnOuterCircle = centerY + Math.sin(currentAngle) * radius;

      const currentAngle2 = startAngle + (i+1) * angleIncrement;
          
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(xOnOuterCircle, yOnOuterCircle);
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();


      // Раскраска сектора в соответствии с кол-вом заработанных баллов и выбранным цветом для каждой категории
      const fillRadX = centerX + Math.cos(currentAngle) * this.wheelData[i].points;
      const fillRadY = centerY + Math.sin(currentAngle) * this.wheelData[i].points;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(fillRadX, fillRadY);

      //Делим на самую дорогую категорию и красим сегмент колеса баланса
      this.ctx.arc(centerX, centerY, radius * this.wheelData[i].points/max_point, currentAngle, currentAngle2);
      this.ctx.moveTo(centerX, centerY);
      this.ctx.fillStyle = this.wheelData[i].color; // Цвет точки
      this.ctx.fill();   
      

      // Добавить надпись из JSON файла
      let text = this.wheelData[i].name;
      this.ctx.font = '20px Shantell Sans cursiveSofia';

      // Измерить ширину текста
      const textWidth = this.ctx.measureText(text).width;

      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      const textRadius = radius + 20;

      // Рассчитать угол между символами
      const anglePerCharacter = textWidth / text.length / textRadius;

      // Рассчитать координаты для центра текста на дуге внешнего круга
      const angleCenterText = currentAngle + ((currentAngle2 - currentAngle)/2);
      const centerXText = centerX + Math.cos(angleCenterText) * textRadius;
      const centerYText = centerY + Math.sin(angleCenterText) * textRadius;

      // Установить положение текста
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // console.log(`Угол: ${angleCenterText}`);
      
      if (angleCenterText > 0 && angleCenterText < Math.PI) {
        //Инвертируем текст ели он лежит от 0 до pi/2 (то есть внизу круга)
        let reverseString: string = "";
        // Iterating through the string
        for (let char of text) {

          // append every character of string to the start of the reverseString
          reverseString = char + reverseString;
        }
        text = reverseString
      }
      this.ctx.save();
      
        
      
      for (let i = 0; i < text.length; i++) {
          this.ctx.save(); 
          const k = text.length/2;
          const angle = angleCenterText + i * anglePerCharacter - anglePerCharacter*k;
          // Рассчитать координаты для каждого символа на дуге внешнего круга
          const x = centerX + Math.cos(angle) * textRadius;
          const y = centerY + Math.sin(angle) * textRadius;
          this.ctx.translate(x, y); // сдвиг на 2 пикселя для каждого символа
          if (angleCenterText > 0 && angleCenterText < Math.PI) {
            this.ctx.rotate(angle - Math.PI/2);
          }
          else {
            this.ctx.rotate(angle + Math.PI/2);
          }
          this.ctx.textAlign = "center";
          this.ctx.font = "16px sans-serif";
          this.ctx.fillStyle = "black";
          this.ctx.fillText(text[i], 0, 0);
          this.ctx.restore(); 
      }
  
    }
  }

}
