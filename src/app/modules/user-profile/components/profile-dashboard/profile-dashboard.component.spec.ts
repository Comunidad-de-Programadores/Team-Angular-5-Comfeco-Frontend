import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashboardComponent } from './profile-dashboard.component';

describe('ProfileDashboardComponent', () => {
  let component: ProfileDashboardComponent;
  let fixture: ComponentFixture<ProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
