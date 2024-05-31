import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedInfinitoPage } from './feed-infinito.page';

describe('FeedInfinitoPage', () => {
  let component: FeedInfinitoPage;
  let fixture: ComponentFixture<FeedInfinitoPage>;

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      declarations: [FeedInfinitoPage], 
    }).compileComponents(); 

    fixture = TestBed.createComponent(FeedInfinitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
