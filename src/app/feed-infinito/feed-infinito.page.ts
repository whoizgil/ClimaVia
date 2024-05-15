import { Component, OnInit } from '@angular/core';
import { NewsService } from '../feed-infinito/news.services';

@Component({
  selector: 'app-feed-infinito',
  templateUrl: './feed-infinito.page.html',
  styleUrls: ['./feed-infinito.page.scss'],
})
export class FeedInfinitoPage implements OnInit {
  articles: any[] = [];
  currentPage = 1;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews(this.currentPage).subscribe((data: any) => {
      this.articles = this.articles.concat(data);
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadNews();
    event.target.complete();
  }
}