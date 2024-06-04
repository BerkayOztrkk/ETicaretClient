import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../services/common/dialog.service';
import { CustomtoastrService } from '../../services/ui/customtoastr.service';
import { QrCodeService } from '../../services/common/qr-code.service';
import { DomSanitizer,  SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizier: DomSanitizer) {
    super(dialogRef)
  }
  qrCodeSafeUrl: SafeUrl;
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom)
    const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizier.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.BallAtom)
  }


}
