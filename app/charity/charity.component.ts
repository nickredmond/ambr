import { Component, OnInit } from '@angular/core';
import { Charity } from '~/models/charity.model';
import { NavigationData } from '~/models/navigation.data';
import { RouterExtensions } from 'nativescript-angular/router';

import * as utilities from "utils/utils";
import * as dialog from "ui/dialogs";

@Component({
  moduleId: module.id,
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {
  public charity: Charity;

  constructor(private navigationData: NavigationData, private router: RouterExtensions) {
    this.charity = navigationData.selectedCharity; 
  }

  ngOnInit() {
  }

  public onNavigatingBack(): void {
    this.router.back();
  }

  public getTotalDonationAmount(): string {
    return "$0.00"; // TODO: implement charity.donations amount logic
  }

  public getTotalNumberOfDonors(): number {
    return 0; // TODO: implement charity.donations unique donors logic
  }

  public onViewWebsiteTap(): void {
    utilities.openUrl(this.charity.website);
  }
}
