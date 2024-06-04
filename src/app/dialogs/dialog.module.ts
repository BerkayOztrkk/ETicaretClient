import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FileuploadComponent } from '../services/common/fileupload/fileupload.component';
import { FileuploadModule } from '../services/common/fileupload/fileupload.module';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrCodeReadingDialogComponent } from './qr-code-reading-dialog/qr-code-reading-dialog.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';



@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent, BasketItemRemoveDialogComponent, ShoppingCompleteDialogComponent, OrderDetailDialogComponent, CompleteOrderDialogComponent, AuthorizeMenuDialogComponent, AuthorizeUserDialogComponent, QrcodeDialogComponent, QrCodeReadingDialogComponent,
    
  ],
  imports: [
    CommonModule,MatDialogModule,MatButtonModule,FileuploadModule,MatCardModule,
    FormsModule,MatTableModule,MatToolbarModule,MatBadgeModule,MatListModule,MatFormField,MatTableModule,MatInputModule,NgxScannerQrcodeModule
  ]
})
export class DialogModule { }
