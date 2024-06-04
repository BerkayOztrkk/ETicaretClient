import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../ui/customtoastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent {
  constructor(private httpClientService: HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomtoastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService 
  ) { }

  public files: NgxFileDropEntry[];

 @Input() options:Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const filedata: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        filedata.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed:()=>{
       
        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers:new HttpHeaders({"responseType":"blob"})
          
          
              },filedata).subscribe(data=>{
                const message:string="Dosyalar başarıyla yüklenmiştir";
               
          if(this.options.isAdminPage){
          this.alertifyService.message(message,{
            dismissOthers:true,
            messageType:MessageType.Success,
            position:Position.TopRight
          })
          }
          else{
            this.customToastrService.message(message,"Başarılı.",{
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
            }
          
            )
          
          }
         

          
              }
            )} 

    });
  }
    //       openDialog(afterClosed:any): void {
    //         const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    //           data: FileUploadDialogState.Yes,
    //         });
        
    //         dialogRef.afterClosed().subscribe(result => {
    //           if(result==FileUploadDialogState.Yes){
    //             afterClosed();
    //           }
            
    //         });
    // }
    
  
  }
  



export class FileUploadOptions {
controller?:string;
action?:string;
queryString?:string;
explanation?:string;
accept?:string;
isAdminPage?:boolean=false;

}

