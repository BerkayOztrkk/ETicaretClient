import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProducts } from '../../../contracts/list-products';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  create(product: Create_Product, successCallBack?: any,errorCallBack?:(errorMessage:string)=>void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
    .subscribe({
      complete: successCallBack,
      error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      }
    });
  }

  
  async read(page?: number, size?: number, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalCount: number, products: ListProducts[] }> {
    const promiseData: Promise<{ totalCount: number, products: ListProducts[] }> = firstValueFrom(this.httpClientService.get<{ totalCount: number, products: ListProducts[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }));
    promiseData.then(p => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message));

    return await promiseData;
 
 
  }  async delete(id:string){
    const deleteObservable:Observable<any>= this.httpClientService.delete<any>({
      controller:"products"
    },id);
   await firstValueFrom(deleteObservable);
  
  
  }
  async readImages(id:string,successCallBack?:()=>void):Promise<List_Product_Image[]>{
    const getObservable: Observable<List_Product_Image[]>= this.httpClientService.get<List_Product_Image[]>({
      action:"getproductimages",
      controller:"products"

    },id);
    const images: List_Product_Image[]=await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }
async deleteImage(id:string,imageId:string,successCallBack?:()=>void){
const deleteObservable= this.httpClientService.delete({
  action:"deleteproductimage",
  controller:"products",
  queryString:`imageId=${imageId}`

},id)
await firstValueFrom(deleteObservable);
successCallBack();
}
async changeShowCase(imageId:string,productId:string,successCallBack?:()=>void){
const changeShowCaseObservable= this.httpClientService.get({
  controller:"products",
  action:"ChangeShowCase",
  queryString:`imageId=${imageId}& productId=${productId}`
});
await firstValueFrom(changeShowCaseObservable);
successCallBack();
}
async updateStockQRCodetoStock(productId:string,stock:number,successCallBack?:()=>void){
  const observable=this.httpClientService.put({
    action:"qrcode",
    controller:"products"
  },{
   ProductId: productId,Stock:stock
  });
  await firstValueFrom(observable);
  successCallBack();

}
}
  
