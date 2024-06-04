import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from '../../services/common/qr-code.service';
import { SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base.component';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { ProductService } from '../../services/common/model/product.service';

@Component({
  selector: 'app-qr-code-reading-dialog',
  templateUrl: './qr-code-reading-dialog.component.html',
  styleUrl: './qr-code-reading-dialog.component.scss'
})
export class QrCodeReadingDialogComponent extends BaseDialog<QrCodeReadingDialogComponent> implements OnInit, OnDestroy {
  constructor(
    dialogRef: MatDialogRef<QrCodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(dialogRef)
  }


  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;

  async ngOnInit() {
    this.scanner.start();

  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  onEvent(e) {

    const jsonData = JSON.parse((e as { data: string }).data);
   const stockValue= (this.txtStock.nativeElement as HTMLInputElement).value;
   this.productService.updateStockQRCodetoStock(jsonData.Id,parseInt(stockValue),()=>{})
  }

}

