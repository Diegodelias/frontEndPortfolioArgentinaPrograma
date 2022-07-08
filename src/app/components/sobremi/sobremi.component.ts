import { Component, OnInit  } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { SobremiModel } from './sobremiModel';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  formValue !: UntypedFormGroup;

  sobreMiModelObj: SobremiModel = new SobremiModel();

  sobreMiData : SobremiModel[]=[];
  
  closeResult = '';
  constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal , private api :ApiService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.formValue.controls['subtitulo'].setValue("nada");

  }


  llenarForm(row) {
    console.log("texto" , row.texto);
    this.formValue.controls['titulo'].setValue(row.titulo);
    this.formValue.controls['subtitulo'].setValue(row.subtitulo);
    this.formValue.controls['texto'].setValue(row.sobremi);


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
    // this.formValue = this.formbuilder.group({
    //   titulo : ['nada'],
    //   subtitulo : ['fdf'],
    //   foto:['fdsf'],
    //   texto:['fsdf']

    // })

    this.formValue = new UntypedFormGroup({
      titulo: new UntypedFormControl(''),
      subtitulo : new UntypedFormControl(''),
      texto : new UntypedFormControl('')
    })
    this.GetDatosSobreMi();
   
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
    console.log("ezzte subtitulo" , row.titulo)
   
    // console.log(this.formValue.value);
    // console.log(" texto sobre mi " , this.formValue.value.texto);
    this.sobreMiModelObj.titulo = this.formValue.value.titulo;
    this.sobreMiModelObj.subtitulo = this.formValue.value.subtitulo;
    this.sobreMiModelObj.sobremi = this.formValue.value.texto;

    
    this.api.update( this.sobreMiModelObj)
    .subscribe(res=>{
      console.log("objeto actualizar" ,  this.sobreMiModelObj);
      // console.log(res);
      // alert("employee added Succesfully");
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
