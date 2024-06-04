import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { FileuploadModule } from '../../../services/common/fileupload/fileupload.module';
import { DeleteModule } from '../../../directives/admin/delete.module';



@NgModule({
  declarations: [
    OrderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:OrderComponent}
    ]),
MatSidenavModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,
    HttpClientModule,
    MatTableModule,MatPaginator,DialogModule,FileuploadModule,DeleteModule
    
  ]
})
export class OrderModule { }
