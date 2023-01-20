import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { IUser } from "src/app/model/user.interface";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../add-user/add-user.component";
import { Router } from '@angular/router';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<IUser>();
  users: IUser[] = [];
  errorMessage!: string;
  status!: string;
  subscription!: Subscription;
  displayedColumns = ["id", "name", "email", "phone", "position", "gender", "introduce", "action"];

  constructor(
    @Inject("SERVICE_TOKEN") private _userService: UserService,
    private _dialog: MatDialog,
    public _router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUsers() {
    this.subscription = this._userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  openAddDialog() {
    const dialogRef = this._dialog.open(AddUserComponent, {
      disableClose: true,
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.dataSource.data.push(user)
        this.usersUpdateChanges()
      }
    });
  }

  navigateUpdatePage(userId: number) {
    this._router.navigate(['/update', userId])
  }

  usersUpdateChanges() {
    this.dataSource._updateChangeSubscription();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
