import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/model/basket.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { OrderService } from '../../../services/common/model/order.service';
import { Create_Order } from '../../../contracts/Order/create_order';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/customtoastr.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from '../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component';

declare var $:any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor( spinner:NgxSpinnerService,private basketService:BasketService,
    private orderService:OrderService,private toastrService:CustomtoastrService,
    private router:Router,private dialogService:DialogService
  ){
    super(spinner);
  }
  basketItems:List_Basket_Item[];
 async ngOnInit(): Promise<void> {
  this.showSpinner(SpinnerType.BallAtom)
    this.basketItems= await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom)
  }
  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId:string=object.target.attributes["id"].value;
    const quantity:number=object.target.value;
    const basketItem:Update_Basket_Item=new Update_Basket_Item();
    basketItem.basketItemId=basketItemId;
    basketItem.quantity=quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)

  }
   removeBasketItem(basketItemId:string){
    this.dialogService.openDialog({
      componentType:BasketItemRemoveDialogComponent,
      data:BasketItemDeleteState.Yes,
       afterClosed:async()=>{
        this.showSpinner(SpinnerType.BallAtom)
    
        await this.basketService.remove(basketItemId);
        var a=$("."+basketItemId)
        $("."+basketItemId).fadeOut(500,()=>this.hideSpinner(SpinnerType.BallAtom));
      }
    })
    
    


  }
  shoppingcomplete(){
  this.dialogService.openDialog({
    componentType:ShoppingCompleteDialogComponent,
    data:ShoppingCompleteState.Yes,
    afterClosed:async ()=>{
      this.showSpinner(SpinnerType.BallAtom)
      const order:Create_Order=new Create_Order();
      order.address="Küçükçekmece";
      order.description="description";
  await this.orderService.create(order);
  this.hideSpinner(SpinnerType.BallAtom);
  this.toastrService.message("Siparişiniz alınmıştır.","Sipariş Alındı",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopRight
  });
  this.router.navigate(["/"]);
    }
  });
  

  }

}