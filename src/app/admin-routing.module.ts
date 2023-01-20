import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserComponent } from './components/user/user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'update/:id', component: UpdateUserComponent },
  { path: '', component: UserComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
