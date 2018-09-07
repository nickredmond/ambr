import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DonateService } from "~/donate/donate.service";
import { Charity } from "~/models/charity.model";

import * as dialog from "ui/dialogs";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { topmost } from "tns-core-modules/ui/frame";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationData } from "~/models/navigation.data";

@Component({
    selector: "Donate",
    moduleId: module.id,
    templateUrl: "./donate.component.html",
    styleUrls: ["./donate.component.scss"]
})
export class DonateComponent implements OnInit {
    @ViewChild("charitiesQueryField") charitiesQueryField: ElementRef;

    public charities: Charity[];
    public charityQueryColSpan = 5;
    public isQueryingCharities = false;

    private topCharities: Charity[];

    constructor(private donateService: DonateService, private router: RouterExtensions, 
        private route: ActivatedRoute, private navigationData: NavigationData) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.initializeCharitiesList();
    }

    public onCharityTap(charity: Charity): void {
        this.navigationData.selectedCharity = charity;
        this.router.navigate(["charity"]);//, { relativeTo: this.route });
    }

    public onQueryCharities($event): void {
        const charitiesQueryField = <TextField>$event.object;
        const queryText = charitiesQueryField.text;
        this.charityQueryColSpan = 4;
        this.isQueryingCharities = true;

        this.donateService.queryCharities(queryText, 0, 10).subscribe(
            (response: Charity[]) => {
                this.charities = response;
            }
        );
    }

    public onCharityQueryCancelTap(): void {
        const queryField: TextField = this.charitiesQueryField.nativeElement;
        queryField.text = "";

        this.charityQueryColSpan = 5;
        this.isQueryingCharities = false;
        this.charities = this.topCharities;
    }

    public getBriefDescription(fullDescription: string): string {
        const appendix = (fullDescription.length > 200) ? "..." : "";
        return fullDescription.substring(0, 200) + appendix;
    }

    private initializeCharitiesList() {
        this.donateService.getTopCharities(0, 10).subscribe(
            (response: Charity[]) => {
                this.charities = this.topCharities = response;
            },
            error => {
                console.log("TODO: error getting charities list");
            }
        );
    }
}
