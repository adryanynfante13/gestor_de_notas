import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ModulesComponent } from './components/modules/modules.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { StudentComponent } from './components/student/student.component';
import { DetailProgramComponent } from './components/detail-program/detail-program.component';
import { AssignStudentComponent } from './components/assign-student/assign-student.component';
import { AssignScoreComponent } from './components/assign-score/assign-score.component';


import { AuthGuard } from './shared/guard/auth.guard';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramComponent } from './components/program/program.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'course/:id', component: CoursesComponent },
  { path: 'modules', component:ModulesComponent },
  { path: 'student/:id', component:StudentComponent },
  { path: 'program/:id', component: DetailProgramComponent },
  {path:'assign-student/:id', component: AssignStudentComponent},
  {path:'assign-score/:id', component: AssignScoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}