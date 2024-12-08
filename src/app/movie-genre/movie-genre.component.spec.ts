import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGenreComponent } from './movie-genre.component';

describe('MovieGenreComponent', () => {
  let component: MovieGenreComponent;
  let fixture: ComponentFixture<MovieGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieGenreComponent]
    });
    fixture = TestBed.createComponent(MovieGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
