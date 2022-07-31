import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { EducacionModel } from '../../modelos/educacionModel';
import { EduSrvService } from '../../servicios/edu-srv.service';
import { ImagenService} from '../../servicios/imagen.service'
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  @ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;

  formValue !: UntypedFormGroup;
  educacionModelObj : EducacionModel= new EducacionModel();
  educacionData : EducacionModel[]=[];
  imagen: any;
  imagenMin: any;
  dataActual = null;
  @Input('auth') _auth:any;
 
  
  closeResult = '';

  constructor(private eduSrv : EduSrvService, private modalService: NgbModal ,private imagenService:ImagenService,
    private spinner: NgxSpinnerService, private formbuilder:UntypedFormBuilder ) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.formValue.reset();
    this.reset();
   
   

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
    // this.educacionModelObj.titulonombre = this.formValue.value.titulonombre;
    // this.educacionModelObj.nombreInstitucion = this.formValue.value.nombreInstitucion;
    // this.educacionModelObj.periodo = this.formValue.value.periodo;
    // this.educacionModelObj.institucion_url = this.formValue.value.institucion_url ;
    // this.educacionModelObj.contenido = this.formValue.value.contenido;

    const formData = new FormData();
    
    formData.append('titulonombre',this.formValue.value.titulonombre);
    formData.append('nombreInstitucion',this.formValue.value.nombreInstitucion);
    formData.append('periodo',this.formValue.value.periodo);
    formData.append('institucion_url',this.formValue.value.institucion_url);
    formData.append('contenido',this.formValue.value.contenido);
    formData.append('document', this.imagen);

    
    this.eduSrv.postEdu(formData)
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
