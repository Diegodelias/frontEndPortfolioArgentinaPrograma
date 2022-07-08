import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {EduSrvService } from '../../../servicios/edu-srv.service';
import { EducacionModel} from '../../../modelos/educacionModel';


@Component({
  selector: 'app-edu-item',
  templateUrl: './edu-item.component.html',
  styleUrls: ['./edu-item.component.css']
})
export class EduItemComponent implements OnInit {


  educacionModelObj: EducacionModel = new EducacionModel();

  closeResult = '';
  formValue !: UntypedFormGroup;

  dataActual = null;

  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal,private edusrv:EduSrvService) { }
  @Input('titulonombre') _titulonombre:String;
  @Input('nombreInstitucion') _nombreInstitucion:String;
  @Input('periodo') _periodo:String;
  @Input('contenido') _contenido:String;
  @Input('id') _id:number;
  @Output("GetDatosEducacion") GetDatosEducacion: EventEmitter<any> = new EventEmitter();
  @Input('completo') _todo:any;
  ngOnInit(): void {

    this.formValue = new UntypedFormGroup({
      titulonombre: new UntypedFormControl(''),
      nombreInstitucion : new UntypedFormControl(''),
      periodo : new UntypedFormControl(''),
      institucion_url: new UntypedFormControl(''),
      contenido: new UntypedFormControl('')
    })





  }




  



  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.formValue.controls['subtitulo'].setValue("nada");

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

  
  llenarForm(row) {
   
    this.formValue.controls['titulonombre'].setValue(row.titulonombre);
    this.formValue.controls['nombreInstitucion'].setValue(row.nombreInstitucion);
    this.formValue.controls['periodo'].setValue(row.periodo);
    this.formValue.controls['institucion_url'].setValue(row.institucion_url);
    this.formValue.controls['contenido'].setValue(row.contenido);
   
   

   


  }



  editarEducacion(row: any) {
   
  
    this.educacionModelObj.titulonombre =  this.formValue.value.titulonombre; 
    this.educacionModelObj.nombreInstitucion =  this.formValue.value.nombreInstitucion;
    this.educacionModelObj.periodo =  this.formValue.value.periodo;
    this.educacionModelObj.contenido =  this.formValue.value.contenido;
    

  
    
    this.edusrv.update( this._id , this.educacionModelObj  )
    .subscribe(res=>{
      console.log("objeto actualizar" ,   this.educacionModelObj);
      // console.log(res);
      alert("Experiencia actualizada correctamente");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.GetDatosEducacion.emit()
      this.formValue.reset();
    },
    err=>{
      alert("Hubo un error")
    }
    );
    

  }

  getDataEdu(id): void {
    
    this.edusrv.get(id)
      .subscribe(
        data => {
          this.dataActual = data;
          console.log('este es el viejo ' , data);
        },
        error => {
          console.log(error , 'este es el error del viejo');
        });
  }
 
  deleteEdu(id: number){
 
    this.edusrv.deleteEdu(id).subscribe( data => {
      console.log(data);
      this.GetDatosEducacion.emit()
    })
   

    // this.GetDatosExperiencia.emit()
    // this.getDataExperiencia(this._id);
   

  }


}
