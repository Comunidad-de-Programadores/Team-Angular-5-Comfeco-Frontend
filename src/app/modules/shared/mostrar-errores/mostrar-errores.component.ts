import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-errores',
  templateUrl: './mostrar-errores.component.html',
  styleUrls: ['./mostrar-errores.component.scss']
})
export class MostrarErroresComponent implements OnInit {
  @Input()
  errores: string [] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
