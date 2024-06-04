import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../../directives/admin/delete.module';
import { FileuploadModule } from '../../../services/common/fileupload/fileupload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild([
      {path:"",component:RoleComponent}
    ]),MatSidenavModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,
    HttpClientModule,
    MatTableModule,MatPaginator,DeleteModule
  ]
})
export class RoleModule { }
