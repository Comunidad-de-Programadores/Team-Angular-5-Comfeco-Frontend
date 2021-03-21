import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workshop } from 'src/app/core/models/workshops/workshops';
import { WorkshopsService } from 'src/app/core/services/api/workshops/workshops.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {
  ws:Workshop[] = [];
  displayWorkshops:Workshop[] = [];
  displayedColumns: string[] = ['nombre', 'fecha', 'autor','area'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workshopsService: WorkshopsService) { }

  ngOnInit(): void {
    this.workshopsService.getWorkshops().subscribe(
      result=> {
        this.ws = result.filter(n =>  new Date(new Date(n.date)).getDay()=== new Date().getDay());
        this.displayWorkshops = this.ws;
        this.dataSource = new MatTableDataSource(this.displayWorkshops);;

        console.log('data: ',this.displayWorkshops)
      },
      err=>{
        // TODO: NotificatioService
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

}
