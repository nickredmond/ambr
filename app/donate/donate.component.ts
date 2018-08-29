import { Component, OnInit } from "@angular/core";
import { DonateService } from "~/donate/donate.service";
import { Charity } from "~/models/charity.model";

@Component({
    selector: "Donate",
    moduleId: module.id,
    templateUrl: "./donate.component.html"
})
export class DonateComponent implements OnInit {
    public charities: Charity[];

    constructor(private donateService: DonateService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    private initializeCharitiesList() {
        this.donateService.getTopCharities(0, 10).subscribe(
            (response: Charity[]) => {
                this.charities = response;
            },
            error => {
                console.log("TODO: error getting charities list");
            }
        );
    }
}
