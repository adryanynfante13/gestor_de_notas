import { ProgramService } from 'src/app/shared/services/program.service';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../modals/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  student:any;

  constructor(
    public afs: AngularFirestore, // Firestore service
    public afAuth: AngularFireAuth, // Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService,
    private pService: ProgramService
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // inicio de sesipon con usuario y contraseña
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          //Se optiene cual es el usuario que esta actualmente logueado
          this.afAuth.currentUser.then(user => {
            if(user !== null){
              const id:string =user.uid;
              
              this.pService.getUserRole(id).subscribe(user => {
                if(user.role == "SuperAdmin"){
                  this.router.navigate(['dashboard']);
                  this.toastr.info('Bienvenido al Sistema SuperAdmin')
                }else if(user.role == "Admin"){
                  this.router.navigate(['dashboard-admin']);
                  this.toastr.info('Bienvenido al Sistema administrador')
                }else{
                  this.router.navigate(['dashboard-student']);
                  this.toastr.info('Bienvenido al Sistema estudiante')
                }
                this.pService.getStudent(id).subscribe(s =>{
                  this.student = s;
                })
              })
            }
          });
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toastr.error('Usuario o contraseña incorrecta, valida tus datos', 'Error')
      });
  }

  // creación de usuarios
  async SignUp(email: string, password: string) {
    try {
      return await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then( (result) => {
          this.toastr.success('Usuario Creado', 'Exitoso')
          this.SendVerificationMail();
          this.SetUserData(result.user);
          return result;
        })
    } catch (error) {
        return error;
      };
  }

  // envio de email de verificación
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.toastr.info('Verifica tu correo', 'Exitoso')
        this.router.navigate(['verify-email-address']);
      });
  }

  // recuperar contraseña
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastr.info('Hemos Enviado un correo a tu email para restablecer tu contraseña', 'Exitoso')
        this.router.navigate(['sign-in']);
      })
      .catch((error) => {
        this.toastr.warning('Usuario no resgistrado', 'Error')
      });
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
  const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // sesión con gogole
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  // cerrar sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.toastr.info('Vuelve pronto')
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

}
