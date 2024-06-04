import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { FileuploadModule } from '../../../services/common/fileupload/fileupload.module';
import { DeleteModule } from '../../../directives/admin/delete.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,
    HttpClientModule,
    MatTableModule,MatPaginator,DialogModule,FileuploadModule,DeleteModule,
    RouterModule.forChild([
      {path:"",component:UserComponent}
    ]),
  ]
})
export class UserModule { }
