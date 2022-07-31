import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { EduSrvService } from '../../../servicios/edu-srv.service';
import { EducacionModel } from '../../../modelos/educacionModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-edu-item',
  templateUrl: './edu-item.component.html',
  styleUrls: ['./edu-item.component.css'],
})
export class EduItemComponent implements OnInit {
  @ViewChild('imagenInputFile', { static: false }) imagenFile: ElementRef;

  educacionModelObj: EducacionModel = new EducacionModel();
  imagen: any;
  imagenMin: any;
  dataActual = null;

  closeResult = '';
  formValue!: UntypedFormGroup;

  constructor(
    private formbuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private edusrv: EduSrvService,
    private imagenService: ImagenService,
    private spinner: NgxSpinnerService
  ) {}
  @Input('titulonombre') _titulonombre: String;
  @Input('nombreInstitucion') _nombreInstitucion: String;
  @Input('periodo') _periodo: String;
  @Input('contenido') _contenido: String;
  @Input('id') _id: number;
  @Output('GetDatosEducacion') GetDatosEducacion: EventEmitter<any> =
    new EventEmitter();
  @Input('completo') _todo: any;
  @Input('imagenurl') _imagenurl: any;
  @Input('auth') _auth:any;
 
 
  ngOnInit(): void {
    this.formValue = new UntypedFormGroup({
      titulonombre: new UntypedFormControl(''),
      nombreInstitucion: new UntypedFormControl(''),
      periodo: new UntypedFormControl(''),
      institucion_url: new UntypedFormControl(''),
      contenido: new UntypedFormControl(''),
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    this.formValue.controls['subtitulo'].setValue('nada');
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
    this.formValue.controls['titulonombre'].setValue(row.titulonombre);
    this.formValue.controls['nombreInstitucion'].setValue(
      row.nombreInstitucion
    );
    this.formValue.controls['periodo'].setValue(row.periodo);
    this.formValue.controls['institucion_url'].setValue(row.institucion_url);
    this.formValue.controls['contenido'].setValue(row.contenido);

    if (this._imagenurl) {
      // this. experienciaData[0].imagenurl;
      this.imagenMin = this._imagenurl;
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
      (data) => {
        this.spinner.hide();
        // this.router.navigate(['/']);
      },
      (err) => {
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

  editarEducacion(row: any) {
    this.educacionModelObj.titulonombre =  this.formValue.value.titulonombre;
    this.educacionModelObj.nombreInstitucion =  this.formValue.value.nombreInstitucion;
    this.educacionModelObj.periodo =  this.formValue.value.periodo;
    this.educacionModelObj.contenido =  this.formValue.value.contenido;
    const formData = new FormData();
    formData.append('educacionId', String(this._id));
    formData.append('titulonombre', String(this.formValue.value.titulonombre));
    formData.append(
      'nombreInstitucion',
      String(this.formValue.value.nombreInstitucion)
    );
    formData.append('periodo', String(this.formValue.value.periodo));
    formData.append(
      'institucion_url',
      String(this.formValue.value.institucion_url)
    );
    formData.append('contenido', String(this.formValue.value.contenido));
    formData.append('document', this.imagen);
    if (this.imagen !== undefined) {
      this.edusrv.update(this._id, formData).subscribe(
        (res) => {
          // console.log(res);
          alert('Experiencia actualizada correctamente');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.GetDatosEducacion.emit();
          this.formValue.reset();
          this.ngOnInit()
       
        },
        (err) => {
          alert('Hubo un error');
        }
      );
    }

    else {


      this.edusrv.updateNull( this._id, this.educacionModelObj)
      .subscribe(res=>{
    
        console.log(res);
        alert("La datos se actualizaron de forma correcta");
        
        let ref = document.getElementById('cancel');
        ref?.click();
        this.GetDatosEducacion.emit();
        this.formValue.reset();
        this.ngOnInit()
       
      },
      err=>{
        alert("Something went wrong")
      }
      );








    }
  }

  getDataEdu(id): void {
    this.edusrv.get(id).subscribe(
      (data) => {
        this.dataActual = data;
        console.log('este es el viejo ', data);
      },
      (error) => {
        console.log(error, 'este es el error del viejo');
      }
    );
  }

  deleteEdu(id: number) {
    this.edusrv.deleteEdu(id).subscribe((data) => {
      console.log(data);
      this.GetDatosEducacion.emit();
    });

    // this.GetDatosExperiencia.emit()
    // this.getDataExperiencia(this._id);
  }
}
