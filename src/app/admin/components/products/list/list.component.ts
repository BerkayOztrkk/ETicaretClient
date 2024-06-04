import { Component,OnInit } from '@angular/core';
import { ListProducts } from '../../../../contracts/list-products';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/model/product.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelecProductImageState, SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { QrcodeDialogComponent } from '../../../../dialogs/qrcode-dialog/qrcode-dialog.component';
declare var $:any



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService,private dialogService:DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','qrcode','photo','edit','delete'];
  dataSource: MatTableDataSource<ListProducts> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalCount: number; products: ListProducts[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
       this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
   
    this.dataSource = new MatTableDataSource<ListProducts>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  addProductPhotos(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px",
        
      }

    })

  }
 


  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

  showQRCode(productId:string){
    this.dialogService.openDialog({
      componentType:QrcodeDialogComponent,
      data:productId,
      afterClosed:()=>{},
      
    })

  }
}
