import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {

  @Input() date: string;
  private interval: any;
  private MILLISECONDS_OF_A_SECOND: number = 1000;
  public REMAINING_DAYS: number;
  public REMAINING_HOURS: number;
  public REMAINING_MINUTES: number;
  public REMAINING_SECONDS: number;
  constructor() {

  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.countdown();
    }, this.MILLISECONDS_OF_A_SECOND);
  }

  countdown() {
    const DATE_TARGET: any = new Date(this.date);
    const NOW: any = new Date();
    const MILLISECONDS_OF_A_MINUTE = this.MILLISECONDS_OF_A_SECOND * 60;
    const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;
    const DURATION = DATE_TARGET - NOW;
    this.REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    this.REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    this.REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    this.REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / this.MILLISECONDS_OF_A_SECOND);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
