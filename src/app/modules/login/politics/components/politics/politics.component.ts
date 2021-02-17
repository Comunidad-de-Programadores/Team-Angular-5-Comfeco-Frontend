import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.scss']
})
export class PoliticsComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle("C#MFECO Politicas de privacidad");
  }

  ngOnInit(): void {
  }

}
