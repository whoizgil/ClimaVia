import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = 'fc91eff83c81472c9d03e094dcd2bb11';
  private baseUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) {}

  getNews(page: number) {
    const url = `${this.baseUrl}?q=clima&apiKey=${this.apiKey}&page=${page}&language=pt`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.articles.filter((article: any) => article.content !== '[Removed]');
      })
    );
  }
}