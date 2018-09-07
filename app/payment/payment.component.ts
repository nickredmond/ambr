import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '~/shared/user.service';
import { WebView } from "ui/web-view";

import * as dialogs from 'ui/dialogs';
const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
  moduleId: module.id,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit {
  @ViewChild("paymentScreen") paymentScreen: ElementRef;

  public isPaymentInfoLoaded = false;

  private _paymentScreenWebViewInterface;//

  constructor(private userService: UserService, private router: RouterExtensions) { }

  ngAfterViewInit() {
    this.userService.getSavedPaymentMethods().subscribe((paymentMethods) => {
      const currentUserToken = this.userService.currentUserToken;
      const stringifiedPayload = JSON.stringify(paymentMethods);
      const paymentScreenUrl = "~/html/stripe-card-payment/stripe-card-payment.html?currentUserToken=" + currentUserToken + "&paymentMethods=" + stringifiedPayload;

      this.isPaymentInfoLoaded = true;
      const paymentScreenElement: WebView = this.paymentScreen.nativeElement;
      this._paymentScreenWebViewInterface = new webViewInterfaceModule.WebViewInterface(paymentScreenElement, paymentScreenUrl);
    });
  }

  public onNavigatingBack(): void {
    this.router.back();
  }
}
