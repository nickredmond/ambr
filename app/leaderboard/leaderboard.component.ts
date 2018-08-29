import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { isAndroid } from "platform";
import { TopGiver } from "~/models/topGiver.model";
import { TopEarner } from "~/models/topEarner.model";
import { LeaderboardService } from "~/leaderboard/leaderboard.service";

import * as dialogs from "ui/dialogs";

@Component({
    selector: "Leaderboard",
    moduleId: module.id,
    templateUrl: "./leaderboard.component.html",
    styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
    public monthlyTopGiversByAmount: TopGiver[];
    public allTimeTopGiversByAmount: TopGiver[];
    public monthlyTopEarnersByPoints: TopEarner[];

    public leaderboardData = {
        "monthlyTopGiversByAmount": [],
        "allTimeTopGiversByAmount": [],
        "monthlyTopEarnersByPoints": []
    };

    public leaderboards = [
        {
            "title": "TOP GIVERS",
            "subtitle": "This month",
            "nameProperty": "name",
            "valueProperty": "amountDonated",
            "isCurrency": true,
            "data": "monthlyTopGiversByAmount" //this.monthlyTopGiversByAmount
        },
        {
            "title": "TOP GIVERS",
            "subtitle": "All-time",
            "nameProperty": "name",
            "valueProperty": "amountDonated",
            "data": "allTimeTopGiversByAmount" //this.allTimeTopGiversByAmount
        },
        {
            "title": "TOP EARNERS",
            "subtitle": "This month",
            "nameProperty": "name",
            "valueProperty": "pointsEarned",
            "data": "monthlyTopEarnersByPoints" //this.monthlyTopEarnersByPoints
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

    constructor(private leaderboardService: LeaderboardService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.intializeLeaderboards();
    }

    onSeeAllPressed(leaderboardName): void {

    }

    getIconSource(entryType: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        const icon = this.ENTRY_TYPE_ICON_MAPPINGS[entryType];

        return iconPrefix + icon;
    }

    private intializeLeaderboards(): void {
        this.leaderboardService.getMonthlyTopGiversByAmount().subscribe(
            (response: TopGiver[]) => {
                this.leaderboardData["monthlyTopGiversByAmount"] = response;
            },
            error => {
                console.log("TODO: error retrieving top givers by amt mo.");
            }
        );

        this.leaderboardService.getAllTimeTopGiversByAmount().subscribe(
            (response: TopGiver[]) => {
                this.leaderboardData["allTimeTopGiversByAmount"] = response;
            },
            error => {
                console.log("TODO: error retrieving alltime top givers");
            }
        );

        this.leaderboardService.getMonthlyTopEarnersByAmount().subscribe(
            (response: TopEarner[]) => {
                this.leaderboardData["monthlyTopEarnersByPoints"] = response;
            },
            error => {
                console.log("TODO: error retrieving mo. top earners");
            }
        )
    }
}
