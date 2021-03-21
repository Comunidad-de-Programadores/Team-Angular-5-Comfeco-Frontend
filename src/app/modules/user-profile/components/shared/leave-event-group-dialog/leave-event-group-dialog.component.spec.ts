import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveEventGroupDialogComponent } from './leave-event-group-dialog.component';

describe('LeaveEventGroupDialogComponent', () => {
  let component: LeaveEventGroupDialogComponent;
  let fixture: ComponentFixture<LeaveEventGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveEventGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveEventGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
