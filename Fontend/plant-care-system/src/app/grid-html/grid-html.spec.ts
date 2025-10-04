import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHtml } from './grid-html';

describe('GridHtml', () => {
  let component: GridHtml;
  let fixture: ComponentFixture<GridHtml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHtml]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHtml);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
