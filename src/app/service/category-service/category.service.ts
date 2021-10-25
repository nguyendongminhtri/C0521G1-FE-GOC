import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Category} from '../../model/Category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
//API LOCAL
  private API_CATEGORY = environment.API_LOCAL + 'category';
  //API SERVER
  // private API_CATEGORY = environment.API_SERVER + 'category';
  constructor(private http: HttpClient) { }
  createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.API_CATEGORY, category);
  }
  pageCategory(nextPage){
    const params = nextPage;
    return this.http.get(this.API_CATEGORY, {params}) // {params} thuoc ve ham get cua angular
  }
  detailCategory(id: number): Observable<Category>{
    return this.http.get<Category>(this.API_CATEGORY+'/'+id);
    // return this.http.get<Category>(`${this.API_CATEGORY}/${id}`)
  }
  updateCategory(id: number, category: Category): Observable<Category>{
    return this.http.put<Category>(this.API_CATEGORY+'/'+id,category)
  }
  deleteCategory(id: number): Observable<Category>{
    return this.http.delete<Category>(this.API_CATEGORY+'/'+id);
  }
}
