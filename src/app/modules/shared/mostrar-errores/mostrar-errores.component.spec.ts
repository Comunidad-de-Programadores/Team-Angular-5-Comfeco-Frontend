import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarErroresComponent } from './mostrar-errores.component';

describe('MostrarErroresComponent', () => {
  let component: MostrarErroresComponent;
  let fixture: ComponentFixture<MostrarErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarErroresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
