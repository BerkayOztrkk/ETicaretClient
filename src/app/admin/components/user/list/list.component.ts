import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { List_User } from '../../../../contracts/users/list_user';
import { UserService } from '../../../../services/common/model/user.service';
import { AuthorizeMenuDialogComponent } from '../../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertify: AlertifyService,private dialogService:DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['Username', 'Namesurname', 'Email', 'TwoFactorEnabled','Role','Delete'];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerType.BallAtom);
    const allUsers: { totalUsersCount: number; users: List_User[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
       this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
   
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
  }

 
  assignRole(id:string){
this.dialogService.openDialog({
  componentType:AuthorizeMenuDialogComponent,
  data:id,
  options:{
    width:"750px"
  },
  afterClosed:()=>{
    this.alertify.message("Rol başarıyla atandı",{
      messageType:MessageType.Success,
      position:Position.TopRight
    })
  }
})
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  
}
