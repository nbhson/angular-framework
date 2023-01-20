import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UtilHelper } from "src/app/helper/util.helper";
import { IUser } from "src/app/model/user.interface";
import { UserService } from "src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  createUsersSubscription!: Subscription;
  form!: FormGroup;
  user!: IUser;
  errorMessage: string = '';
  loading = false;

  constructor(
    @Inject("FORM_BUILDER") private _formBuilder: FormBuilder,
    @Inject("SERVICE_TOKEN") private _userService: UserService,
    public _dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit() {
    this.loading = true;
    this.initUser();
    this.initForm();
    this.loading = false;
  }

  initUser() {
    this.user = {
      name: "",
      email: "",
      id: this.generateID(),
      phone: "",
      introduce: "",
      position: "",
      gender: "Male",
    };
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [
        this.user.name,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      email: [this.user.email, Validators.compose([Validators.required])],
      phone: [this.user.phone, Validators.compose([Validators.required])],
      introduce: [this.user.introduce],
      position: [this.user.position],
      gender: [this.user.gender, Validators.compose([Validators.required])],
    });
  }

  submit() {
    this.loading = true;
    this.validation();
    if (this.form.invalid) {
      return;
    }
    this._userService.createUser(this.user).subscribe({
      next: (user) => {
        this.loading = false;
        this.close(user);
      },
      error: (error) => {
        this.loading = false;
        if (typeof error === 'function') {
          this.errorMessage = error().message;
        } else {
          this.errorMessage = error.message;
        }
      }
    });
  }

  validation() {
    this.user.name = this.user.name;
    this.user.phone = this.user.phone;
    this.user.email = this.user.email;
    if (UtilHelper.isEmptyString(this.user.name)) {
      this.f["name"].setErrors({ required: true });
    }
    if (UtilHelper.isEmptyString(this.user.phone)) {
      this.f["phone"].setErrors({ required: true });
    }
    if (UtilHelper.isEmptyString(this.user.email)) {
      this.f["email"].setErrors({ required: true });
    }
  }

  close(user: IUser) {
    if (user) {
      this._dialogRef.close(user);
    } else {
      this._dialogRef.close();
    }
  }

  generateID() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
  }

  get f() {
    return this.form.controls;
  }
}
