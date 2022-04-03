import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent},
  {path:'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
