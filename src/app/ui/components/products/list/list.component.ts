import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/model/product.service';
import { ListProducts } from '../../../../contracts/list-products';
import { ActivatedRoute } from '@angular/router';
import { List_Product_Image } from '../../../../contracts/list_product_image';
import { FileService } from '../../../../services/common/model/files.service';
import { BaseUrl } from '../../../../contracts/base_url';
import { BasketService } from '../../../../services/common/model/basket.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/customtoastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private fileService:FileService,
    private basketService:BasketService,spinner:NgxSpinnerService,private customToastrService:CustomtoastrService
  ){super(spinner)}
  currentPageNo:number;
  totalCount:number;
  totalPageCount:number;
  pageSize:number=12;
  products:ListProducts[];
  pageList:number[]=[];
  baseUrl:BaseUrl;
  async ngOnInit() {
    this.baseUrl=await this.fileService.GetBaseStorageUrl();
  this.activatedRoute.params.subscribe(async params=>{

this.currentPageNo=parseInt(params["pageNo"] ?? 1);

    const data:{totalCount:number,products:ListProducts[]}=await
    this.productService.read(this.currentPageNo-1,this.pageSize,
     ()=>{
 
     },
     errorMessage=>{
 
     });
    this.products=data.products;
    this.products.map<ListProducts>(p=>{
      const listProduct:ListProducts={
        id:p.id,
        name:p.name,
        createdDate:p.createdDate,
        updatedDate:p.updatedDate,
        stock:p.stock,
        price:p.price, 
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p=>p.showcase).path : "",
        productImageFiles:p.productImageFiles
      };
      return  listProduct;
    });

  

   
    this.totalCount=data.totalCount;
    this.totalPageCount=Math.ceil(this.totalCount/this.pageSize);

    this.pageList=[];
    if(this.currentPageNo-3<=0)
      for(let i=1;i<=7;i++)
    this.pageList.push(i);
  else if(this.currentPageNo+3>=this.totalPageCount)
    for(let i=this.totalPageCount-6;i<=this.totalPageCount;i++)
      this.pageList.push(i);
    else
    for(let i=this.currentPageNo-3;i<=this.currentPageNo+3;i++)
  this.pageList.push(i);

  });
   
  }

 async addToBasket(product:ListProducts){
  this.showSpinner(SpinnerType.BallAtom);
    let _basketItem:Create_Basket_Item=new Create_Basket_Item();
    _basketItem.productId=product.id;
    _basketItem.quantity=1;
await this.basketService.add(_basketItem)
this.hideSpinner(SpinnerType.BallAtom);
this.customToastrService.message("Ürün sepete eklendi","Sepete Eklendi",{
  messageType:ToastrMessageType.Success,
  position:ToastrPosition.TopCenter
});
  }
}
