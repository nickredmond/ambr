import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { isAndroid } from "platform";

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
            "amountDonated": "$92,817.31",
            "entryType": "org"
        },
        {
            "name": "Bill Gates",
            "amountDonated": "$14,312.99",
            "entryType": "peep"
        },
        {
            "name": "Toyota Motor, Inc.",
            "amountDonated": "$9,981.00",
            "entryType": "org"
        }
    ];

    public allTimeTopGiversByAmount = [
        {
            "name": "Toyota Motor, Inc.",
            "amountDonated": "$12,305,201.30",
            "entryType": "org"
        },
        {
            "name": "Nancy Pelosi",
            "amountDonated": "$10,998,462.31",
            "entryType": "peep"
        },
        {
            "name": "Michael Scott",
            "amountDonated": "$9,213,465.00",
            "entryType": "peep"
        }
    ];

    public monthlyTopEarnersByPoints = [
        {
            "name": "Miguel Martinez",
            "pointsEarned": "1237 AP",
            "entryType": "peep"
        },
        {
            "name": "Anthony Bordain",
            "pointsEarned": "1199 AP",
            "entryType": "peep"
        },
        {
            "name": "Instructure",
            "pointsEarned": "892 AP",
            "entryType": "org"
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

    private ENTRY_TYPE_ICON_MAPPINGS = {
        "peep": "house", //"avatar", <== just to show it works
        "org": "house"
    };

    constructor(private itemService: DataService, private router: RouterExtensions) { }

    ngOnInit(): void {
    }

    onSeeAllPressed(leaderboardName): void {

    }

    getIconSource(entryType: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        const icon = this.ENTRY_TYPE_ICON_MAPPINGS[entryType];

        return iconPrefix + icon;
    }
}
