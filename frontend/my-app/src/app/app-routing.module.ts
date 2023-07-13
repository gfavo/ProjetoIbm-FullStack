import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalModeComponent } from './additional-mode/additional-mode.component';
import { LegacyModeComponent } from './legacy-mode/legacy-mode.component';

const routes: Routes = [
  {path:'additional', component:AdditionalModeComponent},
  {path:'', component:LegacyModeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
