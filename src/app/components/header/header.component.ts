import { Component, OnInit } from '@angular/core';
import 'boxicons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { HeaderModel } from '../../modelos/headerModel';
import { HeadersrvService } from '../../servicios/headersrv.service';
import { SobremiModel } from '../../components/sobremi/sobremiModel';
import { ApiService } from 'src/app/servicios/api.service';



declare var particlesJS: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formValue !: UntypedFormGroup;
  headerModelObj : HeaderModel = new HeaderModel ();
  headerData : HeaderModel[]=[];
  closeResult = '';
  

  dataActual = null;
  
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.formValue.controls['subtitulo'].setValue("nada");

  }

  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal,private headerSrv :HeadersrvService , private api :ApiService) { }

  ngOnInit(): void {
    // particlesJS.load('particles-js', 'particles.json', null);

    this.formValue = new UntypedFormGroup({
      nombre: new UntypedFormControl(''),
      apellido : new UntypedFormControl(''),
      titulo : new UntypedFormControl(''),
      subtitulo : new UntypedFormControl(''),
    })
    this.GetDatosUsuario();
   
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


  GetDatosUsuario() : void {

     this.headerSrv.getUser()
    .subscribe(
        headerData   => {
        this.headerData  = headerData ;
        console.log(headerData )
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }

  editarHeader(row: any) {
   
  
    this.headerModelObj.nombre =  this.formValue.value.nombre; 
    this.headerModelObj.apellido =  this.formValue.value.apellido;
    this.headerModelObj.headertitulo =  this.formValue.value.titulo;
    this.headerModelObj.headersubtitulo =  this.formValue.value.subtitulo;
    

  
    
    this.headerSrv.update( this.headerData[0].userId, this.headerModelObj  )
    .subscribe(res=>{
      console.log("objeto actualizar" ,   this.headerModelObj);
      // console.log(res);
      alert("Experiencia actualizada correctamente");
      let ref = document.getElementById('cancel');
      ref?.click();
      
      this.formValue.reset();
      this.ngOnInit();
    },
    err=>{
      console.log("aaaaff", this.headerData[0].userId);
      alert("Hubo un error a")
    }
    );
    

  }


  deleteUsu(){
    
  
    this.headerSrv.deleteSobremi(this.headerData[0].userId!).subscribe( data => {
     
      let ref = document.getElementById('cancel');
        ref?.click();
       
        this.ngOnInit()
        window.location.reload();
   

    }),
    err=>{
      alert("Algo saló mal")
    }

}


  getDataExperiencia(id): void {
    
    this.headerSrv.get(id)
      .subscribe(
        data => {
          this.dataActual = data;
          console.log('este es el viejo ' , data);
        },
        error => {
          console.log(error , 'este es el error del viejo');
        });
  }




  

}
