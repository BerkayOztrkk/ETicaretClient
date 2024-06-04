import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Menu } from '../../../contracts/configuration/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }

 async getAuthorizeDefinitionEndpoints(){
    const observable:Observable<Menu[]>=this.httpClientService.get<Menu[]>({
      controller:"Services"
    });
    return firstValueFrom(observable);
  }
}
