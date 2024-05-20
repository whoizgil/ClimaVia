import { Component, OnInit } from '@angular/core';
import { NewsService } from '../feed-infinito/news.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-infinito',
  templateUrl: './feed-infinito.page.html',
  styleUrls: ['./feed-infinito.page.scss'],
})
export class FeedInfinitoPage implements OnInit {
  articles: any[] = [];
  currentPage = 1;

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(event?: any) {
    this.newsService.getNews(this.currentPage).subscribe((data: any) => {
      const newArticles = data.articles.filter((article: any) => !this.isRemoved(article));
      this.articles = this.shuffle(newArticles);
      if (event) {
        event.target.complete();
      }
    });
  }

  refreshNews(event: any) {
    this.currentPage = 1;
    this.articles = [];
    this.loadNews(event);
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadNews(event);
  }

  openArticle(article: any) {
    this.router.navigate(['/article'], { state: { article: article } });
  }
  

  private isRemoved(article: any): boolean {
    if (!article || !article.title || !article.description) {
      return false;
    }
    return article.title.includes('[Removed]') || article.description.includes('[Removed]');
  }
  

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
