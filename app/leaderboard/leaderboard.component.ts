import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { isAndroid } from "platform";
import { TopGiver } from "~/models/topGiver.model";
import { TopEarner } from "~/models/topEarner.model";
import { LeaderboardService } from "~/leaderboard/leaderboard.service";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

import { ListPicker } from "ui/list-picker";
import { SegmentedBar } from "ui/segmented-bar";
import { TextField } from "ui/text-field";

import * as dialogs from "ui/dialogs";
import { LeaderType } from "~/models/leaderType.enum";

@Component({
    selector: "Leaderboard",
    moduleId: module.id,
    templateUrl: "./leaderboard.component.html",
    styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
    @ViewChild("leaderboardQueryField") leaderboardQueryField: ElementRef; 

    public cancelIcon = faBan;
    public acceptIcon = faCheck;

    public monthlyTopGiversByAmount: TopGiver[];
    public allTimeTopGiversByAmount: TopGiver[];
    public monthlyTopEarnersByPoints: TopEarner[];
    public isSelectingLeaderboard = false;
    public isQueryingLeaders = false;

    public leaderboardOptions = [
        "Top Givers (this month)",
        "Top Givers (all time)",
        "Top Earners (this month)"
    ];
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
    public currentLeaderboard = this.leaderboards[0];
    public currentLeaderboardSelectedIndex = 0;

    public leaderboardEntryTypeOptions = [
        "All",
        "Individuals",
        "Organizations"
    ];

    private PEEP_ENTRY_TYPE = "peep";
    private ORG_ENTRY_TYPE = "org";
    private ENTRY_TYPE_ICON_CODES = {
        "peep": "\uf007",
        "org": "\uf1ad"
    };
    private LEADER_TYPE_FILTER_OPTIONS = {
        0: [this.PEEP_ENTRY_TYPE, this.ORG_ENTRY_TYPE],
        1: [this.PEEP_ENTRY_TYPE],
        2: [this.ORG_ENTRY_TYPE]
    };
    //private LEADERBOARD_SELECTION_TIMEOUT_MILLISECONDS = 1000;
    //private currentLeaderboardSelectionTimeout;
    private currentLeaderboardRowNumber = 3;
    private currentLeaderboardRowSpan = 6;
    private lastLeaderboardSelectedIndex = 0;
    private leaderQueryColSpan = 5;
    private currentLeaderTypeIndex = 0;
    private currentQueryText = null;

    constructor(private leaderboardService: LeaderboardService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.intializeLeaderboards();
    }

    public getLeaderboardData(): any[] {
        const currentLeaderboardData = this.leaderboardData[this.currentLeaderboard.data];
        return currentLeaderboardData;
    }
    public onLeaderTypeFilter($event): void {
        const leaderTypeFilter = <SegmentedBar>$event.object;
        this.currentLeaderTypeIndex = leaderTypeFilter.selectedIndex;
        this.queryCurrentLeaderboard(this.currentQueryText);
    }

    public onSelectLeaderboardTap(): void {
        this.isSelectingLeaderboard = true;
        this.currentLeaderboardRowNumber = 6;
        this.currentLeaderboardRowSpan = 3;
        this.lastLeaderboardSelectedIndex = this.currentLeaderboardSelectedIndex;
    }
    public onLeaderboardSelectCancel(): void {
        this.currentLeaderboardSelectedIndex = this.lastLeaderboardSelectedIndex;
        this.resetSelectionView();
    }
    public onLeaderboardSelectApprove(): void {
        this.currentLeaderboard = this.leaderboards[this.currentLeaderboardSelectedIndex];
        this.queryCurrentLeaderboard(this.currentQueryText);
        this.resetSelectionView();
    }
    public selectedLeaderboardIndexChanged($event): void {
        //clearTimeout(this.currentLeaderboardSelectionTimeout);
        
        const leaderboardSelect = <ListPicker>$event.object;
        this.currentLeaderboardSelectedIndex = leaderboardSelect.selectedIndex;
       // this.currentLeaderboardSelectionTimeout = setTimeout(() => {
        //}, this.LEADERBOARD_SELECTION_TIMEOUT_MILLISECONDS);
    }
    
    public getLeaderboardRowNumber(): number {
        return this.currentLeaderboardRowNumber;
    }
    public getLeaderboardRowSpan(): number {
        return this.currentLeaderboardRowSpan;
    }

    public getIconCodeByLeaderType(entryType): string {
        return this.ENTRY_TYPE_ICON_CODES[entryType];
    }

    public onQueryLeaders($event): void {
        this.isQueryingLeaders = true;
        this.leaderQueryColSpan = 4;

        const queryField = <TextField>$event.object;
        const query = queryField.text;
        this.currentQueryText = query;
        this.queryCurrentLeaderboard(query);
    }

    public getLeaderQueryColSpan(): number {
        return this.leaderQueryColSpan;
    }

    public onLeaderQueryCancelTap(): void {
        this.currentQueryText = null;
        this.queryCurrentLeaderboard(null);

        const queryField: TextField = this.leaderboardQueryField.nativeElement;
        queryField.text = "";

        this.isQueryingLeaders = false;
        this.leaderQueryColSpan = 5;
    }

    // onSeeAllPressed(leaderboardName): void {

    // }

    // getIconSource(entryType: string): string {
    //     const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
    //     const icon = this.ENTRY_TYPE_ICON_MAPPINGS[entryType];

    //     return iconPrefix + icon;
    // }

    private getCurrentLeaderType(): LeaderType {
        return <LeaderType>this.currentLeaderTypeIndex;
    }

    private queryCurrentLeaderboard(query: string): void {
        const currentLeaderType = this.getCurrentLeaderType();

        switch (this.currentLeaderboard.data) {
            case "monthlyTopGiversByAmount": 
                this.leaderboardService.getMonthlyTopGiversByAmount(query, currentLeaderType, 0, 10).subscribe(
                    (response: TopGiver[]) => {
                        this.leaderboardData["monthlyTopGiversByAmount"] = response;
                    }
                );
                break;
            case "allTimeTopGiversByAmount":
                this.leaderboardService.getAllTimeTopGiversByAmount(query, currentLeaderType, 0, 10).subscribe(
                    (response: TopGiver[]) => {
                        this.leaderboardData["allTimeTopGiversByAmount"] = response;
                    }
                );
                break;
            case "monthlyTopEarnersByPoints":
                this.leaderboardService.getMonthlyTopEarnersByAmount(query, currentLeaderType, 0, 10).subscribe(
                    (response: TopEarner[]) => {
                        this.leaderboardData["monthlyTopEarnersByPoints"] = response;
                    }
                );
                break;
        }
    }

    private resetSelectionView(): void {
        this.isSelectingLeaderboard = false;
        this.currentLeaderboardRowNumber = 3;
        this.currentLeaderboardRowSpan = 6;
    }

    private intializeLeaderboards(): void {
        this.leaderboardService.getMonthlyTopGiversByAmount(null, LeaderType.All, 0, 10).subscribe(
            (response: TopGiver[]) => {
                this.leaderboardData["monthlyTopGiversByAmount"] = response;
            },
            error => {
                console.log("TODO: error retrieving top givers by amt mo.");
            }
        );

        this.leaderboardService.getAllTimeTopGiversByAmount(null, LeaderType.All, 0, 10).subscribe(
            (response: TopGiver[]) => {
                this.leaderboardData["allTimeTopGiversByAmount"] = response;
            },
            error => {
                console.log("TODO: error retrieving alltime top givers");
            }
        );

        this.leaderboardService.getMonthlyTopEarnersByAmount(null, LeaderType.All, 0, 10).subscribe(
            (response: TopEarner[]) => {
                this.leaderboardData["monthlyTopEarnersByPoints"] = response;
            },
            error => {
                console.log("TODO: error retrieving mo. top earners");
            }
        )
    }
}
