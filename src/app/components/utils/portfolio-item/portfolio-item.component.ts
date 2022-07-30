import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ControlContainer, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ProyectossrvService  } from '../../../servicios/proyectossrv.service';
import { ProyectoModel  } from '../../../modelos/proyectoModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/servicios/imagen.service';


@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  @ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;

  proyModelObj: ProyectoModel = new ProyectoModel();
  imagen: any;
  imagenMin: any;
  dataActual = null;



  @Input('id') _id:any;
  @Input('nombreproyecto') _nombre_proyecto:String;
  @Input('demourl') _demourl:any;
  @Input('githuburl') _githuburl:String;
  @Input('completo') _completo:any;
  @Input('linkvideo') _linkvideo:String;
  @Input('imagenurl') _imagenurl:String;
  @Output("GetDatosProyecto") GetDatosProyecto: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  formValue !: UntypedFormGroup;
  @Input('auth') _auth:any;


  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal,private proysrv:ProyectossrvService , private imagenService:ImagenService,private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {

    this.formValue = new UntypedFormGroup({
      nombreproyecto: new UntypedFormControl(''),
      demourl: new UntypedFormControl(''),
      descripcion: new UntypedFormControl(''),
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

    this.formValue.controls['nombreproyecto'].setValue(row.nombreproyecto);
    this.formValue.controls['demourl'].setValue(row.demourl);
    this.formValue.controls['githuburl'].setValue(row.githuburl);
    this.formValue.controls['linkvideo'].setValue(row.linkvideo);
  
   
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




  
  editarProyecto(row: any) {
   
  
    this.proyModelObj.nombreproyecto =  this.formValue.value.nombreproyecto; 
    this.proyModelObj.demourl =  this.formValue.value.demourl;
    this.proyModelObj.githuburl =  this.formValue.value.githuburl;
    // this.proyModelObj.descripcion =  this.formValue.value.descripcion;
    this.proyModelObj.linkvideo =  this.formValue.value.linkvideo;

    console.log("esto" , this.proyModelObj.linkvideo);
    

    const formData = new FormData();
    formData.append('proyectoId', String(this._id)) ;
    formData.append('nombreproyecto',this.formValue.value.nombreproyecto);
    formData.append('demourl',this.formValue.value.demourl);
    formData.append('githuburl',this.formValue.value.githuburl);
    formData.append('descripcion',this.formValue.value.descripcion);
    formData.append('linkvideo',this.formValue.value.linkvideo);
   

    if (this.imagen !== undefined) {

      formData.append('document', this.imagen);
      
      this.proysrv.update( this._id , formData  )
      .subscribe(res=>{
        
        console.log(res);
        alert("Experiencia actualizada correctamente");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.GetDatosProyecto.emit()
        this.formValue.reset();
        this.ngOnInit()
      },
      err=>{
    
        alert("Hubo un error")
      }
      );
    




    } else {

      this.proysrv.updateNull( this._id, this.proyModelObj)
      .subscribe(res=>{
    
        console.log(res);
        alert("La datos se actualizaron de forma correcta");
        
        let ref = document.getElementById('cancel');
        ref?.click();
        this.GetDatosProyecto.emit()
        this.formValue.reset();
        this.ngOnInit()
       
      },
      err=>{
        alert("Something went wrong")
      }
      );








    }



  
    

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
