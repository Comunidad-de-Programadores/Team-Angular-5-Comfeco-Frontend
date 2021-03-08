import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgetsComponent } from './badgets.component';

describe('BadgetsComponent', () => {
  let component: BadgetsComponent;
  let fixture: ComponentFixture<BadgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
