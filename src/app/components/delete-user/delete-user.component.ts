import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    public _dialogRef: MatDialogRef<DeleteUserComponent>
  ) { }

  ngOnInit() {
  }

  submit() {
    // code here
  }

  close() {
    this._dialogRef.close();
  }

}
