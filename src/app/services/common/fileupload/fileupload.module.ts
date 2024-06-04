import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FileuploadComponent,FileUploadDialogComponent
    
  ],
  imports: [
    CommonModule,NgxFileDropModule,
   MatButtonModule,MatDialogModule
  ],
  exports:[
FileuploadComponent  ]
})
export class FileuploadModule { }
