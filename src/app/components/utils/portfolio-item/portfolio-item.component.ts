import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ControlContainer, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ProyectossrvService  } from '../../../servicios/proyectossrv.service';
import { ProyectoModel  } from '../../../modelos/proyectoModel';


@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  proyModelObj: ProyectoModel = new ProyectoModel();

  @Input('id') _id:any;
  @Input('nombreproyecto') _nombre_proyecto:String;
  @Input('demourl') _demourl:any;
  @Input('githuburl') _githuburl:String;
  @Input('completo') _completo:any;
  @Input('linkvideo') _linkvideo:String;
  @Output("GetDatosProyecto") GetDatosProyecto: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  formValue !: UntypedFormGroup;

  dataActual = null;

  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal,private proysrv:ProyectossrvService  ) { }

  ngOnInit(): void {

    this.formValue = new UntypedFormGroup({
      nombreproyecto: new UntypedFormControl(''),
      demourl: new UntypedFormControl(''),
      githuburl : new UntypedFormControl(''),
      linkvideo: new UntypedFormControl('')
    
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

    this.formValue.controls['nombreproyecto'].setValue(row.nombre_proyecto);
    this.formValue.controls['demourl'].setValue(row.demourl);
    this.formValue.controls['githuburl'].setValue(row.githuburl);
  
   
   

   


  }

  
  editarProyecto(row: any) {
   
  
    this.proyModelObj.nombre_proyecto =  this.formValue.value.nombreproyecto; 
    this.proyModelObj.demourl =  this.formValue.value.demourl;
    this.proyModelObj.githuburl =  this.formValue.value.githuburl;
    this.proyModelObj.descripcion =  this.formValue.value.descripcion;
    this.proyModelObj.foto_proyecto =  this.formValue.value.foto_proyecto;

   
    

  
    
    this.proysrv.update( this._id , this.proyModelObj  )
    .subscribe(res=>{
      console.log("objeto actualizar" ,   this.proyModelObj);
      console.log(res);
      alert("Experiencia actualizada correctamente");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.GetDatosProyecto.emit()
      this.formValue.reset();
    },
    err=>{
   
      alert("Hubo un error")
    }
    );
    

  }

  getDataSkill(id): void {
    
    this.proysrv.get(id)
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
 
    this.proysrv.deleteProyecto(id ).subscribe( data => {
     
      this.GetDatosProyecto.emit()
    })
    

    // this.GetDatosExperiencia.emit()
    // this.getDataExperiencia(this._id);
   

  }


 
}
