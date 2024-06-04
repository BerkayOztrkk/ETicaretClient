import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/User';
import { CreateUser } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../ui/customtoastr.service';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from '../../../contracts/users/list_user';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomtoastrService) { }
  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({

      controller: "users"

    }, user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, {
      password: password,
      passwordConfirm: passwordConfirm,
      userId: userId,
      resetToken: resetToken
    });
    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error))
    await promiseData;
  }


  async getAllUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalUsersCount: number, users: List_User[] }> {
    const observable: Observable<{ totalUsersCount: number, users: List_User[] }> = this.httpClientService.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallback(error));
    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));
    await promiseData;
  }
  async getRolesToUser(userId:string,successCallBack?: () => void, errorCallBack?: (error) => void):Promise<string[]>{
const observable:Observable<{userRoles:string[]}> =this.httpClientService.get({
  controller:"users",
  action:"get-roles-to-user"
},userId);
const promiseData=firstValueFrom(observable);
promiseData.then(()=>successCallBack())
.catch(error=>errorCallBack(error));
return (await promiseData).userRoles;
  }
}
