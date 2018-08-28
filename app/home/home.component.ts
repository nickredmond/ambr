import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    public monthlyTopGiversByAmount = [
        {
            "name": "Coca-Cola Company",
            "amountDonated": 92817.31
        },
        {
            "name": "Bill Gates",
            "amountDonated": 14312.99
        },
        {
            "name": "Toyota Motor, Inc.",
            "amountDonated": 9981.00
        }
    ];

    public allTimeTopGiversByAmount = [
        {
            "name": "Toyota Motor, Inc.",
            "amountDonated": 12305201.30
        },
        {
            "name": "Nancy Palosi",
            "amountDonated": 10998462.31
        },
        {
            "name": "Michael Scott",
            "amountDonated": 9213465.00
        }
    ];

    public monthlyTopEarnersByPoints = [
        {
            "name": "Miguel Martinez",
            "pointsEarned": 1237
        },
        {
            "name": "Anthony Bordain",
            "pointsEarned": 1199
        },
        {
            "name": "Instructure",
            "pointsEarned": 892
        }
    ];

    public leaderboards = [
        {
            "title": "TOP GIVERS",
            "subtitle": "This month",
            "nameProperty": "name",
            "valueProperty": "amountDonated",
            "isCurrency": true,
            "data": this.monthlyTopGiversByAmount
        },
        {
            "title": "TOP GIVERS",
            "subtitle": "All-time",
            "nameProperty": "name",
            "valueProperty": "amountDonated",
            "data": this.allTimeTopGiversByAmount
        },
        {
            "title": "TOP EARNERS",
            "subtitle": "This month",
            "nameProperty": "name",
            "valueProperty": "pointsEarned",
            "data": this.monthlyTopEarnersByPoints
        }
    ];

    public leaderboardEntryTypeOptions = [
        "All",
        "Individuals",
        "Organizations"
    ];

    constructor(private itemService: DataService, private router: RouterExtensions) { }

    ngOnInit(): void {
    }

    onSeeAllPressed(leaderboardName): void {

    }
}
