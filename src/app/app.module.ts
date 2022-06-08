import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { BotonComponent } from './components/utils/boton/boton.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ExperienceboxComponent } from './components/utils/experiencebox/experiencebox.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EduItemComponent } from './components/utils/edu-item/edu-item.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressBarComponent } from './components/utils/progress-bar/progress-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProfSkillsComponent } from './components/utils/prof-skills/prof-skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioItemComponent } from './components/utils/portfolio-item/portfolio-item.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectMesesComponent } from './components/utils/select-meses/select-meses.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    AcercadeComponent,
    BotonComponent,
    SobremiComponent,
    ExperienciaComponent,
    ExperienceboxComponent,
    EducacionComponent,
    EduItemComponent,
    SkillsComponent,
    ProgressBarComponent,
    ProfSkillsComponent,
    ProyectosComponent,
    PortfolioItemComponent,
    SelectMesesComponent,
    
  ],
  imports: [
    NgbPaginationModule, NgbAlertModule,
    BrowserModule,ProgressbarModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    
    
    }),
    ModalModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [BsModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
