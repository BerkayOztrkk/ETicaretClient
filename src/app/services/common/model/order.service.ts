import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {  Create_Order } from '../../../contracts/Order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Order } from '../../../contracts/Order/list_order';
import { __values } from 'tslib';
import { error } from 'console';
import { Single_Order } from '../../../contracts/Order/single_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

 async create(order:Create_Order):Promise<void>{
const observable:Observable<any>=this.httpClientService.post({
  controller:"orders"
},order);
await firstValueFrom(observable);
  }

   
 async getAllOrders(page:number=0,size:number=5,successCallBack?: () => void, errorCallback?: (errorMessage: string) => void):Promise<{ totalCount: number, orders: List_Order[] }>{
  const observable:Observable<{ totalCount: number, orders: List_Order[] }>=this.httpClientService.get({
    controller:"orders",
    queryString: `page=${page}&size=${size}`
  });
  const promiseData=firstValueFrom(observable);
  promiseData.then(value=>successCallBack())
  .catch(error=>errorCallback(error));
  return await promiseData;
    }

    async getOrderById(id:string,successCallBack?: () => void, errorCallback?: (errorMessage: string) => void){
      const observable:Observable<Single_Order>=this.httpClientService.get<Single_Order>({
        controller:"orders"
      
      },id);
      const promiseData=firstValueFrom(observable);
      promiseData.then(value=>successCallBack())
      .catch(error=>errorCallback(error));
      return await promiseData;
    }

    async completeOrder(id:string){
      const observable:Observable<any>=this.httpClientService.get({
        controller:"orders",
        action:"complete-order"
      },id);
await firstValueFrom(observable);
    }
}
