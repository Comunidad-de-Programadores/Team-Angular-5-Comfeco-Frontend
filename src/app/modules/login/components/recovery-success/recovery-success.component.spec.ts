import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverySuccessComponent } from './recovery-success.component';

describe('RecoverySuccessComponent', () => {
  let component: RecoverySuccessComponent;
  let fixture: ComponentFixture<RecoverySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
