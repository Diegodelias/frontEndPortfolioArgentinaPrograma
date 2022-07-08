import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { EducacionModel } from '../../modelos/educacionModel';
import { EduSrvService } from '../../servicios/edu-srv.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  formValue !: UntypedFormGroup;
  educacionModelObj : EducacionModel= new EducacionModel();
  educacionData : EducacionModel[]=[];
  
  closeResult = '';

  constructor(private eduSrv : EduSrvService, private modalService: NgbModal ) { }

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
    
    this.formValue = new UntypedFormGroup({
      titulonombre: new UntypedFormControl(''),
      nombreInstitucion : new UntypedFormControl(''),
      periodo : new UntypedFormControl(''),
      institucion_url: new UntypedFormControl(''),
      contenido: new UntypedFormControl('')
    })



    this.GetDatosEducacion()
  }

  GetDatosEducacion() : void {
    
    this. eduSrv.getEdu()
    .subscribe(
        experienciaData  => {
        this.educacionData= experienciaData;
        console.log(experienciaData)
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }


  postEdu(){
    this.educacionModelObj.titulonombre = this.formValue.value.titulonombre;
    this.educacionModelObj.nombreInstitucion = this.formValue.value.nombreInstitucion;
    this.educacionModelObj.periodo = this.formValue.value.periodo;
    this.educacionModelObj.institucion_url = this.formValue.value.institucion_url ;
    this.educacionModelObj.contenido = this.formValue.value.contenido;
   
    this.eduSrv.postEdu(this.educacionModelObj)
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
