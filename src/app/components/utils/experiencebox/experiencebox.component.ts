import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ExperienciaSrvService } from '../../../servicios/experiencia-srv.service';
import { ExperienciaModel} from '../../../modelos/experienciaModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-experiencebox',
  templateUrl: './experiencebox.component.html',
  styleUrls: ['./experiencebox.component.css']
})
export class ExperienceboxComponent implements OnInit {

  @ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;


  experienciaModelObj: ExperienciaModel = new ExperienciaModel();
  imagen: any;
  imagenMin: any;
  dataActual = null;

  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal,private expsrv:ExperienciaSrvService , private imagenService:ImagenService,private spinner: NgxSpinnerService) { 
   

  }
  experienciaData : ExperienciaModel[]=[];
  @Input('puesto') _puesto:String;
  @Input('periodo') _periodo:String;
  @Input('descripcion') _descripcion:String;
  @Input('empresa') _empresa:String;
  @Input('id') _id:number;
  @Input('completo') _todo:any;
  @Input('imagenurl') _imagenurl:any;
  @Input('auth') _auth :any;
  @Output("GetDatosExperiencia") GetDatosExperiencia: EventEmitter<any> = new EventEmitter();

  closeResult = '';
  formValue !: UntypedFormGroup;


 
  

  ngOnInit(): void {
    this.formValue = new UntypedFormGroup({
      puesto: new UntypedFormControl(''),
      empresa : new UntypedFormControl(''),
      periodo : new UntypedFormControl(''),
      descripcion: new UntypedFormControl('')
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
   
   

    if (this._imagenurl) {
      // this. experienciaData[0].imagenurl;
      this.imagenMin =  this._imagenurl;
    
    } 



  }

  
  onFileChange(event) {
   
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
    // this.ngOnInit()
  }

  onUpload(): void {
    this.spinner.show();
    
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        // this.router.navigate(['/']);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.imagen = '';
    this.imagenMin = '';
    this.imagenFile.nativeElement.value = '';
  }




  editarExperiencia(row: any) {
   
  
    this.experienciaModelObj.puesto =  this.formValue.value.puesto; 

    this.experienciaModelObj.empresa_nombre =  this.formValue.value.empresa;
    this.experienciaModelObj.periodo =  this.formValue.value.periodo;
    this.experienciaModelObj.descripcion =  this.formValue.value.descripcion;
    const formData = new FormData();
    formData.append('trabajoId', String(this._id)) ;
    formData.append('puesto',this.formValue.value.puesto);
    formData.append('empresa_nombre',this.formValue.value.empresa_nombre);
    formData.append('periodo',this.formValue.value.periodo);

    formData.append('descripcion',this.formValue.value.descripcion);
    // formData.append('document', this.imagen);
    if (this.imagen !== undefined) {
      formData.append('document', this.imagen);
      this.expsrv.update( this._id ,formData   )
    .subscribe(res=>{
      // console.log("objeto actualizar" ,   this.experienciaModelObj);
      // console.log(res);
      alert("Experiencia actualizada correctamente");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.GetDatosExperiencia.emit()
      this.formValue.reset();
      this.ngOnInit()
       
    },
    err=>{
      alert("Hubo un error")
    }
    );
    } else {
      
      this.expsrv.updateNull( this._id, this.experienciaModelObj)
      .subscribe(res=>{
    
        console.log(res);
        alert("La datos se actualizaron de forma correcta");
        
        let ref = document.getElementById('cancel');
        ref?.click();
        this.GetDatosExperiencia.emit()
        this.formValue.reset();
        this.ngOnInit()
       
      },
      err=>{
        alert("Something went wrong")
      }
      );












    }
   


    

  
    
    
    

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
