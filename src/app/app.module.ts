import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./service/user.service";
import { MaterialModule } from "./modules/material.module";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormatStringPipe } from "./pipe/format-string.pipe";
import { HightLightDirective } from "./directives/hight-light.directive";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ToolbarComponent,
    AddUserComponent,
    UpdateUserComponent,
    FormatStringPipe,
    HightLightDirective,
    NotFoundComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  entryComponents: [AddUserComponent, DeleteUserComponent],
  providers: [
    { provide: "SERVICE_TOKEN", useClass: UserService },
    { provide: "FORM_BUILDER", useClass: FormBuilder },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
