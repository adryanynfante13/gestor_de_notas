import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ModulesComponent } from './components/modules/modules.component';
import { CreateUserComponent } from './components/create-user/create-user.component';


import { AuthGuard } from './shared/guard/auth.guard';
import { ProgramsComponent } from './components/programs/programs.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'modules', component:ModulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}