import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-event-group-dialog',
  templateUrl: './leave-event-group-dialog.component.html',
  styleUrls: ['./leave-event-group-dialog.component.scss']
})
export class LeaveEventGroupDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LeaveEventGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title:Text,description:Text, actionButtons:{accept:string, cancel:string}}
  ) { }

  ngOnInit(): void {
  }

  onAcceptClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick():void {
    this.dialogRef.close(false);
  }

}
