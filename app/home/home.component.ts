import { Component, OnInit } from '@angular/core';
import { isAndroid } from "platform";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

    return iconPrefix + icon;
}
}
