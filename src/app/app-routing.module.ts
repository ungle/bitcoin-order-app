import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';
import { ListComponent } from './components/list.component';
import { EditComponent } from './components/edit.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'order-form', component: FormComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
