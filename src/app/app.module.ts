import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { StudentComponent } from './components/student/student.component';
import { DetailProgramComponent } from './components/detail-program/detail-program.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ModulesComponent } from './components/modules/modules.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ProgramComponent } from './components/program/program.component';

// componentes de la Gráfica
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

// routing
import { AppRoutingModule } from './app-routing.module';

// service
import { AuthService } from './shared/services/auth.service';

import { ReactiveFormsModule } from '@angular/forms';
import { AssignStudentComponent } from './components/assign-student/assign-student.component';
import { AssignScoreComponent } from './components/assign-score/assign-score.component';
import { GraficaDetalleComponent } from './components/grafica-detalle/grafica-detalle.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    ProgramsComponent,
    CoursesComponent,
    ModulesComponent,
    CreateUserComponent,
    ProgramComponent,
    StudentComponent,
    DetailProgramComponent,
    AssignStudentComponent,
    AssignScoreComponent,
    GraficaDetalleComponent,

    DashboardStudentComponent,
    DashboardAdminComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    BrowserModule,
    NgxChartsModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule

  ],
  providers: [AuthService, HttpClientModule],
  bootstrap: [AppComponent],
})

export class AppModule {}
