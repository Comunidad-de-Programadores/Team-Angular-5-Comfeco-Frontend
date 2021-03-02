import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTemplateComponent } from './success-template.component';

describe('SuccessTemplateComponent', () => {
  let component: SuccessTemplateComponent;
  let fixture: ComponentFixture<SuccessTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
