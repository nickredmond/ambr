import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { UserService } from '~/shared/user.service';

import * as dialogs from 'ui/dialogs';

@Component({
  moduleId: module.id,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public paymentScreenUrl: string;
  public isPaymentInfoLoaded = false;

  constructor(private userService: UserService, private router: RouterExtensions) { }

  ngOnInit() {
    this.userService.getSavedPaymentMethods().subscribe((paymentMethods) => {
      const currentUserId = this.userService.currentUserId;
      const stringifiedPayload = JSON.stringify(paymentMethods);
      this.paymentScreenUrl = "~/html/stripe-card-payment/stripe-card-payment.html?currentUserId=" + currentUserId + "&paymentMethods=" + stringifiedPayload;
      this.isPaymentInfoLoaded = true;
    });
  }

  public onNavigatingBack(): void {
    this.router.back();
  }
}
