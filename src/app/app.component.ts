import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
// https://nestdanchia.github.io/add/
import * as _moment from 'moment';
const moment = _moment;
class Articulo {
  constructor(public taskName: string, public taskState: string,
    public startDate: Date, public asOfDate: Date, public updatedAt: Date) {
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startDatePick = new Date(2022, 3, 1);
  date = moment();

  selDate!: string;
  selDay !: string;
  selMonth !: string;
  selYear !: string;

  title = "hola";
  dataSource: any;
  articuloselect: Articulo = new Articulo("", "", new Date(), new Date(), new Date());
  @ViewChild(MatTable) tabla1!: MatTable<Articulo>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  columnas: string[] = ['taskName', 'taskState', 'startDate', 'asOfDate', 'updatedAt'];
  datos: Articulo[] = [new Articulo('Deportes', 'Activo', new Date(2022, 4, 1), new Date(2022, 4, 21), new Date(2022, 4, 5)),
  new Articulo('Cine', 'Activo', new Date(2022, 8, 1), new Date(2022, 8, 18), new Date(2022, 8, 5)),
  new Articulo('Ajedrez', 'Activo', new Date(2022, 10, 1), new Date(2022, 10, 29), new Date(2022, 10, 14)),
  ];
  ngOnInit() {

    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    console.log('ngOnInit this.datos:', this.datos)
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
  }
  agregar() {
    let index=this.datos.length;
    console.log(index)
    let nuevaTarea = new Articulo(this.articuloselect.taskName,
      this.articuloselect.taskState, this.articuloselect.startDate,
      this.articuloselect.asOfDate, this.articuloselect.updatedAt)
    console.log(nuevaTarea);
    this.datos.splice(index, 0, nuevaTarea);
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.tabla1.renderRows();
    this.articuloselect = new Articulo("", "", new Date("2015-03-25"), new Date(), new Date());
  }
  onDateChange($event: any) {
    console.log($event.value, moment($event.value).format('YYYY-MM-DD'))
    const formatted = moment($event.value).format('YYYY-MM-DD');
    console.log(formatted)

  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value);
    this.selDate = this.date.format('DD');
    this.selDay = this.date.format('dddd');
    this.selMonth = this.date.format('MMMM');
    this.selYear = this.date.format('YYYY');
  }

}





