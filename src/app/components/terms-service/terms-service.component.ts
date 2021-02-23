import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss']
})
export class TermsServiceComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle("C#MFECO Terminos de servicio");
  }

  ngOnInit(): void {
  }

}
