import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../article/article.page';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = 'fc91eff83c81472c9d03e094dcd2bb11';
  private baseUrl = 'https://newsapi.org/v2/everything';
  private climateKeywords = ['clima', 'climático', 'meteorologia', 'temperatura', 'previsão do tempo', 'fenômenos meteorológicos'];

  constructor(private http: HttpClient) {}

  getNews(page: number): Observable<{ articles: Article[] }> {
    const searchTerm = this.climateKeywords.join(' OR ');
    const url = `${this.baseUrl}?q=${searchTerm}&language=pt&apiKey=${this.apiKey}&page=${page}`;
    return this.http.get<{ articles: Article[] }>(url);
  }
}
