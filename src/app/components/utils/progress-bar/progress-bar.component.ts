import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkillsModel } from '../../../modelos/skillsModels';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SkillSrvService  } from '../../../servicios/skill-srv.service';




@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  skillModelObj: SkillsModel = new SkillsModel();


  
  experienciaData : SkillsModel[]=[];

  
  @Input('skillporcentaje') _skillporcentaje:any;
  @Input('skillnombre') _skillnombre:string;
  @Input('completo') _completo:any;
  @Input('id') _id:number;
  @Output("GetDatosSkills") GetDatosSkills: EventEmitter<any> = new EventEmitter();

  closeResult = '';
  formValue !: FormGroup;

  dataActual = null;

  constructor(private formbuilder:FormBuilder,private modalService: NgbModal,private skillsrv:SkillSrvService ) { }

  ngOnInit(): void {
    console.log("iddddd", this._id)
    this.formValue = new FormGroup({
      skillnombre: new FormControl(''),
      tipo: new FormControl(''),
      skillporcentaje : new FormControl('')
    
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

    this.formValue.controls['skillnombre'].setValue(row.skillnombre);
    this.formValue.controls['tipo'].setValue(row.tipo);
    this.formValue.controls['skillporcentaje'].setValue(row.skillporcentaje);
  
   
   

   


  }



  editarSkill(row: any) {
   
  
    this.skillModelObj.skillnombre =  this.formValue.value.skillnombre; 
    this.skillModelObj.skillporcentaje =  this.formValue.value.skillporcentaje;
    this.skillModelObj.tipo =  this.formValue.value.tipo;
   
    

  
    
    this.skillsrv.update( this._id , this.skillModelObj  )
    .subscribe(res=>{
      console.log("objeto actualizar" ,   this.skillModelObj);
      console.log(res);
      alert("Experiencia actualizada correctamente");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.GetDatosSkills.emit()
      this.formValue.reset();
    },
    err=>{
      console.log("objeto actualizar" ,   this.skillModelObj);
      alert("Hubo un error")
    }
    );
    

  }

  getDataSkill(id): void {
    
    this.skillsrv.get(id)
      .subscribe(
        data => {
          this.dataActual = data;
          console.log('este es el viejo ' , data);
        },
        error => {
          console.log(error , 'este es el error del viejo');
        });
  }
 
  deleteSkill(id: number){
 
    this.skillsrv.deleteSkill(id ).subscribe( data => {
     
      this.GetDatosSkills.emit()
    })
    

    // this.GetDatosExperiencia.emit()
    // this.getDataExperiencia(this._id);
   

  }


}
