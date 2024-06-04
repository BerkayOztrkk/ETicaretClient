import { Component,OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { DialogService } from '../../../services/common/dialog.service';
import { QrCodeReadingDialogComponent } from '../../../dialogs/qr-code-reading-dialog/qr-code-reading-dialog.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService,private dialogService:DialogService) { 
    super(spinner)
    
    
  }
  ngOnInit(): void {
   this.showSpinner(SpinnerType.BallAtom);
   this.httpClientService.get({
    controller:"products"
   }).subscribe(data=>console.log(data));
   
  }
  @ViewChild(ListComponent) listComponents:ListComponent;
  createdProduct(createdProduct:Create_Product){
this.listComponents.getProducts();
  }
  showProductQRCodeReading(){
    this.dialogService.openDialog({
    componentType:QrCodeReadingDialogComponent,
    data:null,
    options:{
      width:"1000px"
    },
    afterClosed:()=>{}
    });
    
  }
}
