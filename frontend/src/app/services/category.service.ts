import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICategoryForCreate } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/assistant/api/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }

  getActiveCategories(): Observable<ICategory[]> {
    const url = `${this.apiUrl}/active`;
    return this.http.get<ICategory[]>(url);
  }  
  
  createCategory(category: ICategoryForCreate): Observable<ICategoryForCreate> {
  return this.http.post<ICategoryForCreate>(this.apiUrl, category);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
      return this.http.put<ICategory>(this.apiUrl, category);
    }
      
}
