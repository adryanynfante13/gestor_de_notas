import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }

/*finishDate() {
    const x = (<HTMLInputElement>document.getElementById("myInput")).value;
    const element: HTMLElement = document.getElementById("initialDate") as HTMLElement;
    element.innerHTML = "You wrote: " + x;
}*/

/*date() {
  let counter: number = 0;
  const date = new Date((<HTMLInputElement>document.getElementById("date")).valueAsDate);
  const duration = (<HTMLInputElement>document.getElementById("duration")).valueAsNumber;
  while (counter<duration) {
    date.setTime(date.getTime()+24*60*60*1000); // añadimos 1 día
    if (date.getDay() != 6 && date.getDay() != 0)
  counter++;  
  }
  let mounth = date.getMonth()+1;
    if (mounth<10) 
    mounth = 0 + mounth;
    let finishDate = date.getDate()+ '/' + mounth + '/' + date.getFullYear();
    console.log(finishDate)
    document.write(finishDate); 
    return new Date(finishDate);
  }
  */
}