import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ProyectoModel } from '../../modelos/proyectoModel';
import { ProyectossrvService } from '../../servicios/proyectossrv.service';
import { ImagenService} from '../../servicios/imagen.service'
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  @ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;

  formValue !: UntypedFormGroup;
  proyectoModelObj :  ProyectoModel = new  ProyectoModel();
  proyectoData :  ProyectoModel[]=[];
  imagen: any;
  imagenMin: any;
  dataActual = null;
  @Input('auth') _auth :any;
  
  closeResult = '';

  constructor(private proyectoSrv : ProyectossrvService , private modalService: NgbModal, private imagenService:ImagenService,
    private spinner: NgxSpinnerService, private formbuilder:UntypedFormBuilder  ) { }

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
      nombreproyecto: new UntypedFormControl(''),
      demourl : new UntypedFormControl(''),
      githuburl : new UntypedFormControl(''),
      descripcion: new UntypedFormControl(''),
      linkvideo:  new UntypedFormControl('')
     
    })



    this.GetDatosProyecto()
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
    // this.proyectoModelObj.nombre_proyecto = this.formValue.value.nombre_proyecto;
    // this.proyectoModelObj.demourl = this.formValue.value.demourl;
    // this.proyectoModelObj.githuburl = this.formValue.value.githuburl;
    // this.proyectoModelObj.descripcion = this.formValue.value.descripcion;

    const formData = new FormData();

     
    formData.append('nombreproyecto',this.formValue.value.nombreproyecto);
    formData.append('demourl',this.formValue.value.demourl);
    formData.append('githuburl',this.formValue.value.githuburl);
    formData.append('descripcion',this.formValue.value.descripcion);
    formData.append('linkvideo',this.formValue.value.linkvideo);
    formData.append('document', this.imagen);



  
   
    this.proyectoSrv.postProyecto(formData)
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
