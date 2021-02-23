import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCommunitiesComponent } from './side-communities.component';

describe('SideCommunitiesComponent', () => {
  let component: SideCommunitiesComponent;
  let fixture: ComponentFixture<SideCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideCommunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
