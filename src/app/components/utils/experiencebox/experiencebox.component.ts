import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExperienciaSrvService } from '../../../servicios/experiencia-srv.service';
import { ExperienciaModel} from '../../../modelos/experienciaModel';

@Component({
  selector: 'app-experiencebox',
  templateUrl: './experiencebox.component.html',
  styleUrls: ['./experiencebox.component.css']
})
export class ExperienceboxComponent implements OnInit {

  experienciaModelObj: ExperienciaModel = new ExperienciaModel();

  constructor(private formbuilder:FormBuilder,private modalService: NgbModal,private expsrv:ExperienciaSrvService) { 
   

  }
  experienciaData : ExperienciaModel[]=[];
  @Input('puesto') _puesto:String;
  @Input('periodo') _periodo:String;
  @Input('descripcion') _descripcion:String;
  @Input('empresa') _empresa:String;
  @Input('id') _id:number;
  @Input('completo') _todo:any;
  @Output("GetDatosExperiencia") GetDatosExperiencia: EventEmitter<any> = new EventEmitter();

  closeResult = '';
  formValue !: FormGroup;

  dataActual = null;

  

  ngOnInit(): void {
    this.formValue = new FormGroup({
      puesto: new FormControl(''),
      empresa : new FormControl(''),
      periodo : new FormControl(''),
      descripcion: new FormControl('')
    })
    // this.getDataExperiencia(this._id);
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
    console.log("texto puesssto" , row.empresa_nombre);
    this.formValue.controls['puesto'].setValue(row.puesto);
    this.formValue.controls['empresa'].setValue(row.empresa_nombre);
    this.formValue.controls['periodo'].setValue(row.periodo);
    this.formValue.controls['descripcion'].setValue(row.descripcion);
   
   

   


  }



  editarExperiencia(row: any) {
   
  
    this.experienciaModelObj.puesto =  this.formValue.value.puesto; 
    this.experienciaModelObj.empresa_nombre =  this.formValue.value.empresa;
    this.experienciaModelObj.periodo =  this.formValue.value.periodo;
    this.experienciaModelObj.descripcion =  this.formValue.value.descripcion;
    

  
    
    this.expsrv.update( this._id , this.experienciaModelObj  )
    .subscribe(res=>{
      console.log("objeto actualizar" ,   this.experienciaModelObj);
      // console.log(res);
      alert("Experiencia actualizada correctamente");
      this.GetDatosExperiencia.emit()
      this.formValue.reset();
    },
    err=>{
      alert("Hubo un error")
    }
    );
    

  }

  getDataExperiencia(id): void {
    
    this.expsrv.get(id)
      .subscribe(
        data => {
          this.dataActual = data;
          console.log('este es el viejo ' , data);
        },
        error => {
          console.log(error , 'este es el error del viejo');
        });
  }
 
  deleteEmployee(id: number){
 
    this.expsrv.deleteExperiencia(id).subscribe( data => {
      console.log(data);
      this.GetDatosExperiencia.emit()
    })
   

    // this.GetDatosExperiencia.emit()
    // this.getDataExperiencia(this._id);
   

  }

 
}
