import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ProyectoModel } from '../../modelos/proyectoModel';
import { ProyectossrvService } from '../../servicios/proyectossrv.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  formValue !: FormGroup;
  proyectoModelObj :  ProyectoModel = new  ProyectoModel();
  proyectoData :  ProyectoModel[]=[];
  
  closeResult = '';

  constructor(private proyectoSrv : ProyectossrvService , private modalService: NgbModal ) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
   

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    
    this.formValue = new FormGroup({
      nombre_proyecto: new FormControl(''),
      demourl : new FormControl(''),
      githuburl : new FormControl(''),
      descripcion: new FormControl(''),
      foto_proyecto:  new FormControl('')
     
    })



    this.GetDatosProyecto()
  }

  GetDatosProyecto() : void {
    
    this.proyectoSrv.getProyectos()
    .subscribe(
      proyectoData  => {
        this.proyectoData = proyectoData ;
        console.log(proyectoData )
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }


  postProyecto(){
    this.proyectoModelObj.nombre_proyecto = this.formValue.value.nombre_proyecto;
    this.proyectoModelObj.demourl = this.formValue.value.demourl;
    this.proyectoModelObj.githuburl = this.formValue.value.githuburl;
    this.proyectoModelObj.descripcion = this.formValue.value.descripcion;

  
   
    this.proyectoSrv.postProyecto(this.proyectoModelObj)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById('cancel');
      ref?.click();
      // alert("Experiencia agregada correctamente")
      this.ngOnInit()
    }),
    err=>{
      alert("Algo saló mal")
    }

  }



}
