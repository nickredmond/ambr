import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { NavigationData } from "~/models/navigation.data";
import { UserService } from "~/shared/user.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService, private router: RouterExtensions, private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        if (!this.userService.isUserLoggedIn()) {
            this.router.navigate(["home"]);
        }
        else {
            this.router.navigate(["login"]);
        }
    }
}
