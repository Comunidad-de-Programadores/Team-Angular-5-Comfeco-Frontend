import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideWorkshopComponent } from './side-workshop.component';

describe('SideWorkshopComponent', () => {
  let component: SideWorkshopComponent;
  let fixture: ComponentFixture<SideWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideWorkshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
