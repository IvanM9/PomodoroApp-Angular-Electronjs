import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { ElectronStoreService } from '../electron-store.service';

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

  constructor(private electronStoreService: ElectronStoreService) {
    try {
      this.tiempoTrabajo = electronStoreService.get('tiempoTrabajo') ? electronStoreService.get('tiempoTrabajo') : 25;
      this.tiempoDescanso = electronStoreService.get('tiempoDescanso') ? electronStoreService.get('tiempoDescanso') : 5;

      // this.tiempoTrabajo = localStorage.getItem('tiempoTrabajo') ? localStorage.getItem('tiempoTrabajo') : 0;
      // this.tiempoDescanso = localStorage.getItem('tiempoDescanso') ? localStorage.getItem('tiempoDescanso') : 0;

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
      this.electronStoreService.set('tiempoTrabajo', this.tiempoTrabajo);
      this.electronStoreService.set('tiempoDescanso', this.tiempoDescanso);
      // localStorage.setItem('tiempoTrabajo', this.tiempoTrabajo);
      // localStorage.setItem('tiempoDescanso', this.tiempoDescanso);

      if (this.toast) {
        this.toast.show();
      }

    } catch (error) {
      console.log(error);
    }
  }

}
