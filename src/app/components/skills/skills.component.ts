import { Component, Input, OnInit } from '@angular/core';
import { SkillSrvService  } from '../../servicios/skill-srv.service';
import { SkillsModel } from '../../modelos/skillsModels';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  formValue !: UntypedFormGroup;
  skillsModelObj : SkillsModel= new SkillsModel();
  skillsData : SkillsModel[]=[];
  @Input('auth') _auth :any;
  
  closeResult = '';

 constructor(private formbuilder:UntypedFormBuilder,private modalService: NgbModal, private SkillSrv :SkillSrvService   ) { }
 
ngOnInit(): void {
    this.formValue = new UntypedFormGroup({
      skillporcentaje: new UntypedFormControl(''),
      skillnombre: new UntypedFormControl(''),
      tipo:new UntypedFormControl('')

  })
  
  this.GetDatosSkills()

  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
   

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

  GetDatosSkills() : void {

   

    
    this.SkillSrv.getSkills()
    .subscribe(
      skillsData   => {
        this.skillsData  = skillsData ;
        console.log(skillsData )
        
       
      } ,
      (error:any) => {
        console.log(error);
      }
    )
    
  }


  
  postSkill(){
    this.skillsModelObj.skillnombre = this.formValue.value.skillnombre;
    this.skillsModelObj.skillporcentaje = this.formValue.value.skillporcentaje;
    this.skillsModelObj.tipo = this.formValue.value.tipo;
    console.log("porcentaje", this.skillsModelObj.skillporcentaje )
   
    this.SkillSrv.postSkill(this.skillsModelObj)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById('cancel');
      ref?.click();
      alert("Experiencia agregada correctamente")
     
      this.ngOnInit()
    }),
    err=>{
      alert("Algo saló mal")
    }

  }


}
