import { Component, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tiempoTrabajo: any;
  tiempoDescanso: any;
  htmltoast: any;
  toast: Toast | null = null;

  constructor() {
    try {
      this.tiempoTrabajo = localStorage.getItem('tiempoTrabajo') ? localStorage.getItem('tiempoTrabajo') : 25;
      this.tiempoDescanso = localStorage.getItem('tiempoDescanso') ? localStorage.getItem('tiempoDescanso') : 5;

    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {
    this.htmltoast = document.getElementById('liveToast');
    this.toast = new Toast(this.htmltoast, {});

  }
  actualizarTiempos() {
    try {
      localStorage.setItem('tiempoTrabajo', this.tiempoTrabajo);
      localStorage.setItem('tiempoDescanso', this.tiempoDescanso);
      if (this.toast) {
        this.toast.show();
      }

    } catch (error) {
      console.log(error);
    }
  }

}
