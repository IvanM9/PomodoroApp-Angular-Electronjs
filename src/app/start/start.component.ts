import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  modo: boolean = true;
  estado: string = 'trabajo';
  tiempoTrabajo: any;
  tiempoDescanso: any;
  minutos: number = 25;
  segundos: number = 0;
  intervalId: any;
  descansoLargo: any = 0;

  constructor() {
    this.tiempoTrabajo = localStorage.getItem('tiempoTrabajo') ? localStorage.getItem('tiempoTrabajo') : 25;
    this.tiempoDescanso = localStorage.getItem('tiempoDescanso') ? localStorage.getItem('tiempoDescanso') : 5;
    this.descansoLargo = sessionStorage.getItem('descansoLargo') ? sessionStorage.getItem('descansoLargo') : 0;
    this.minutos = this.tiempoTrabajo;
  }

  ngOnInit(): void {
    localStorage.setItem('tiempoTrabajo', this.tiempoTrabajo);
    localStorage.setItem('tiempoDescanso', this.tiempoDescanso);
  }

  delay(delay: number) {
    return new Promise(r => {
      this.intervalId = setTimeout(r, delay);
    })
  }

  async timer(modo: boolean) {
    if (modo) {
      this.modo = false;
      var minutos = this.minutos - 1;
      for (let i = minutos; i >= 0; i--) {
        this.minutos = i;
        for (let j = 59; j >= 0; j--) {
          this.segundos = j;
          await this.delay(1000);
        }
      }
    }
    this.modo = true;
    clearTimeout(this.intervalId);
    this.descansoLargo = this.estado == 'trabajo' ? this.descansoLargo + 1 : this.descansoLargo;
    sessionStorage.setItem('descansoLargo', this.descansoLargo);
    this.estado = this.estado == 'trabajo' ? 'descanso' : 'trabajo';
    this.tiempoDescanso = this.descansoLargo % 4 == 0 ? 15 : localStorage.getItem('tiempoDescanso');
    this.minutos = this.estado === 'trabajo' ? this.tiempoTrabajo : this.tiempoDescanso;
    this.segundos = 0;
  }


}
