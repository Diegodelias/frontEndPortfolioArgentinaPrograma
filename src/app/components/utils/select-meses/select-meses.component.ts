import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-select-meses',
  templateUrl: './select-meses.component.html',
  styleUrls: ['./select-meses.component.css']
})
export class SelectMesesComponent implements OnInit {
  selected = '';
  Meses: any = ['Enero','Febrero', 'Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor() { }

  ngOnInit(): void {
  }

}
