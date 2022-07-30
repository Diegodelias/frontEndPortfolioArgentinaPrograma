import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ExperienciaModel} from '../../modelos/experienciaModel';
import {ExperienciaSrvService } from '../../servicios/experiencia-srv.service';
import { ImagenService} from '../../servicios/imagen.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtClientService } from 'src/app/servicios/jwt-client.service';
import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

@ViewChild('imagenInputFile',{static: false}) imagenFile: ElementRef;

  formValue !: UntypedFormGroup;
  experienciaModelObj : ExperienciaModel = new ExperienciaModel();
  experienciaData : ExperienciaModel[]=[];
  
  imagen: any;
  imagenMin: any;
  dataActual = null;

  @Input('auth') _auth:any;
 
  authRequest:any={
    "userName":"usuarioUno",
    "password":"123456"
  };

  response:any;
  
  closeResult = '';
  
  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal, private experienciaSrv : ExperienciaSrvService ,private imagenService:ImagenService,
    private spinner: NgxSpinnerService, private jwtService:JwtClientService , public authService : AuthService  ) { }

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
      puesto: new UntypedFormControl(''),
      empresa : new UntypedFormControl(''),
      logo_empresa : new UntypedFormControl(''),
      periodo: new UntypedFormControl(''),
      anioInicio : new UntypedFormControl(''),
      descripcion : new UntypedFormControl('')
     
    })
    this.GetDatosExperiencia();

    // this.getAccessToken(this.authRequest);

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



  postExperiencia(){
    // this.experienciaModelObj.puesto = this.formValue.value.puesto;
    // this.experienciaModelObj.empresa_nombre = this.formValue.value.empresa;
    // this.experienciaModelObj.periodo = this.formValue.value.periodo;
    // this.experienciaModelObj.logo_empresa = this.formValue.value.logo_empresa;
    // this.experienciaModelObj.descripcion = this.formValue.value.descripcion;

    
   
    const formData = new FormData();
    formData.append('puesto',this.formValue.value.puesto);
    formData.append('empresa_nombre',this.formValue.value.empresa_nombre);
    formData.append('periodo',this.formValue.value.periodo);

    formData.append('descripcion',this.formValue.value.descripcion);
    formData.append('document', this.imagen);



    this.experienciaSrv.postExperiencia(formData)


    
    .subscribe(res=>{

      console.log(res);
      alert("La datos se actualizaron de forma correcta");
      
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.ngOnInit()



  
    }),
    err=>{
      alert("Algo saló mal")
    }

  }

  
  GetDatosExperiencia() : void {
    
    this.experienciaSrv.getExperience()
    .subscribe(
        experienciaData  => {
        this.experienciaData = experienciaData;
        console.log(experienciaData)
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }


  public getAccessToken(authRequest){
    let resp=this.jwtService.generateToken(authRequest);
   
    resp.subscribe(data=>this.accessApi(data));
      }
    

  public accessApi(token){
      console.log("tokeeeen" , token)
      let resp=this.jwtService.welcome(token);
      resp.subscribe(data=>this.response=data);
          }

 
}
