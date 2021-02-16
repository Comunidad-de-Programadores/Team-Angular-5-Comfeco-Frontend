import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAutenticacionComponent } from './formulario-autenticacion.component';

describe('FormularioAutenticacionComponent', () => {
  let component: FormularioAutenticacionComponent;
  let fixture: ComponentFixture<FormularioAutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAutenticacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
