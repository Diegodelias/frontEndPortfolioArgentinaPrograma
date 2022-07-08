import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ExperienciaModel} from '../../modelos/experienciaModel';
import {ExperienciaSrvService } from '../../servicios/experiencia-srv.service';



@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  formValue !: FormGroup;
  experienciaModelObj : ExperienciaModel = new ExperienciaModel();
  experienciaData : ExperienciaModel[]=[];
  
  closeResult = '';
  
  constructor(private formbuilder:FormBuilder,private modalService: NgbModal, private experienciaSrv : ExperienciaSrvService  ) { }

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
      puesto: new FormControl(''),
      empresa : new FormControl(''),
      logo_empresa : new FormControl(''),
      periodo: new FormControl(''),
      anioInicio : new FormControl(''),
      descripcion : new FormControl('')
     
    })
    this.GetDatosExperiencia();

  }

  postExperiencia(){
    this.experienciaModelObj.puesto = this.formValue.value.puesto;
    this.experienciaModelObj.empresa_nombre = this.formValue.value.empresa;
    this.experienciaModelObj.periodo = this.formValue.value.periodo;
    this.experienciaModelObj.logo_empresa = this.formValue.value.logo_empresa;
    this.experienciaModelObj.descripcion = this.formValue.value.descripcion;
    console.log(this.experienciaModelObj);
    this.experienciaSrv.postExperiencia(this.experienciaModelObj)
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

  
  GetDatosExperiencia() : void {
    
    this.experienciaSrv.getExperience()
    .subscribe(
        experienciaData  => {
        this.experienciaData = experienciaData;
        console.log(experienciaData)
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }


}
