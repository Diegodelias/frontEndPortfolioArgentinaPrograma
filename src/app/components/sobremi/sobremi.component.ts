import { Component, ElementRef, Input, OnInit , ViewChild } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { SobremiModel } from './sobremiModel';
import { ApiService } from '../../servicios/api.service';
import { ImagenService} from '../../servicios/imagen.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  @ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;

  formValue !: UntypedFormGroup;

  sobreMiModelObj: SobremiModel = new SobremiModel();

  sobreMiData : SobremiModel[]=[];

  
  
  imagen: any;
  imagenMin: any;
  dataActual = null;
  
  @Input('auth') _auth:any;
  closeResult = '';
  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal , private api :ApiService , private imagenService:ImagenService,
    private spinner: NgxSpinnerService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    // this.formValue.controls['subtitulo'].setValue("nada");

  }

  open2(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    // this.formValue.controls['subtitulo'].setValue("nada");

  }


  llenarForm(row) {
    // console.log("texto" , row.texto);
    this.formValue.controls['titulo'].setValue(row.titulo);
    this.formValue.controls['subtitulo'].setValue(row.subtitulo);
    this.formValue.controls['texto'].setValue(row.sobremi);
    //traer foto si existe por id de usuario

    if (this.sobreMiData[0].imagenurl) {
      this.sobreMiData[0].imagenurl;
      this.imagenMin =  this.sobreMiData[0].imagenurl;
    
    } 



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
      titulo: new FormControl(''),
      subtitulo : new FormControl(''),
      texto : new FormControl(''),
      headertitulo: new FormControl(''),
      headersubtitulo: new FormControl(''),
      password: new FormControl(''),
      usuario: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      sobremi: new FormControl(''),
      imagen: new FormControl(''),
      email: new FormControl(''),
      



    })
    this.GetDatosSobreMi();
  

   
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

  GetDatosSobreMi() : void {
    this.api.getUser()
    .subscribe(
        sobreMiData  => {
        this.sobreMiData = sobreMiData;
        console.log(sobreMiData)
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }

  editarSobreMi(row: any) {
   
    this.sobreMiModelObj.titulo = this.formValue.value.titulo;
    this.sobreMiModelObj.subtitulo = this.formValue.value.subtitulo;
    this.sobreMiModelObj.sobremi = this.formValue.value.texto;
    const formData = new FormData();
    formData.append('userId', String(this.sobreMiData[0].userId)) ;
    formData.append('sobremi',this.formValue.value.texto);
    formData.append('titulo', this.formValue.value.titulo);
    formData.append('subtitulo', this.formValue.value.subtitulo);
    if (this.imagen !== undefined) {
      formData.append('document', this.imagen);
   
   
      this.api.update( 1, formData)
      .subscribe(res=>{
    
        console.log(res);
        alert("La datos se actualizaron de forma correcta");
        
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.ngOnInit()
       
      },
      err=>{
        alert("Something went wrong")
      }
      );

    } else {

        
      this.api.updateNull( 1, this.sobreMiModelObj)
      .subscribe(res=>{
    
        console.log(res);
        alert("La datos se actualizaron de forma correcta");
        
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.ngOnInit()
       
      },
      err=>{
        alert("Something went wrong")
      }
      );


    }
    
    

  }




  get(id): void {
    
    this.api.get(id)
      .subscribe(
        data => {
          this.dataActual = data;
          console.log('este es el viejo ' , data);
        },
        error => {
          console.log(error , 'este es el error del viejo');
        });
  }
 
  refresh(): void {
    window.location.reload();
}

  postSobremi(){
    
    // console.log("la recalcada concja de tu madre");
    // this.sobreMiModelObj.titulo = this.formValue.value.titulo;
    // this.sobreMiModelObj.subtitulo = this.formValue.value.subtitulo;
    // this.sobreMiModelObj.sobremi = this.formValue.value.texto;
    // this.sobreMiModelObj.document = this.imagen;
  
    //tendría que mandar thos imagen

    const formData = new FormData();
    formData.append('sobremi',this.formValue.value.texto);
    formData.append('titulo', this.formValue.value.titulo);
    formData.append('subtitulo', this.formValue.value.subtitulo);
    formData.append('document', this.imagen);
    formData.append('headertitulo', this.formValue.value.headertitulo);
    formData.append('headersubtitulo', this.formValue.value.headersubtitulo);
    formData.append('usuario', this.formValue.value.usuario);
    formData.append('password', this.formValue.value.password);
    formData.append('email', this.formValue.value.email);
    formData.append('nombre', this.formValue.value.nombre);
    formData.append('apellido', this.formValue.value.apellido);
    

    

    
   
    this.api.postSobremi(formData)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById('cancel');
      ref?.click();
      alert("Experiencia agregada correctamente");
      this.ngOnInit();
      this.refresh();
   
    }),
    err=>{
      alert("Algo saló mal")
    }

  }


  deleteUsu(){
    
  
    this.api.deleteSobremi(this.sobreMiData[0].userId).subscribe( data => {
     
      let ref = document.getElementById('cancel');
        ref?.click();
       
        this.ngOnInit()
        window.location.reload();
   

    }),
    err=>{
      alert("Algo saló mal")
    }

}


}