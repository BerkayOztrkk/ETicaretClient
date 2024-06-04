import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-Url';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner)
    // signalRService.start(HubUrls.ProductHub);
    // signalRService.start(HubUrls.OrderHub);
  }
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      alert(message);
    });
    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      alert(message);
    });
  }

}
