import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleI } from 'src/app/shared/modals/module-i';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  formModules: FormGroup = new FormGroup({});

  constructor(authService: AuthService, 
    private programService: ProgramService,  
    private route: Router) { }
  
  ngOnInit(): void {
    this.formModules = new FormGroup(
      {
        name: new FormControl ('', [Validators.required]),
        description: new FormControl ('', [Validators.required]),
        percentage: new FormControl ('', [Validators.required]),
      }
    )
  }
  saveCourse(){
    const module: ModuleI = {
      name: this.formModules.value.name,
      percentage: this.formModules.value.percentage,
      score: this.formModules.value.score,
      }
      this.programService.saveModules(module).subscribe();
     
     // console.log(module);
  }
}
