import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { JwtClientService } from 'src/app/servicios/jwt-client.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ApiService } from 'src/app/servicios/api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formValue !: FormGroup;


  @Input('auth') _auth:any;

  // form = new FormGroup({
  //   username: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required),
  // });


 

  constructor(private modalService: NgbModal ,private authSrv : AuthService ) { }

  ngOnInit(): void {

    this.formValue = new FormGroup({
      username: new FormControl(''),
     password : new FormControl(''),
  
    })
  }

  closeResult = '';

logout() {
  this.authSrv.logout()
  this.ngOnInit()
  window.location.reload();
}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.formValue.reset();
   
   

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



  submitForm() {
    if (this.formValue.invalid) {
      return;
    }
 
    console.log({
      "userName": this.formValue.value.username ,
      "password": this.formValue.value.password,
    });

    this.authSrv.login(this.formValue.value.username,
      this.formValue.value.password,
    )
     .subscribe((response) => {

    
      
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.ngOnInit()

        // this.router.navigate(['/dashboard']);
      }); err=>{
      alert("Algo saló mal")
    }
      

  
  }




}
