import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedInfinitoPage } from './feed-infinito.page';

describe('FeedInfinitoPage', () => {
  let component: FeedInfinitoPage;
  let fixture: ComponentFixture<FeedInfinitoPage>;

  beforeEach(async () => { // Adicione o modificador async para beforeEach
    await TestBed.configureTestingModule({
      declarations: [FeedInfinitoPage], // Declare o componente a ser testado
    }).compileComponents(); // Compile os componentes assíncronos

    fixture = TestBed.createComponent(FeedInfinitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
