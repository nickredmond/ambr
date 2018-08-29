import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { DonateComponent } from "./donate/donate.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { SearchComponent } from "./search/search.component";

export const COMPONENTS = [DonateComponent, LeaderboardComponent, SearchComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(leaderboardTab:leaderboard//donateTab:donate//searchTab:search)", pathMatch: "full" },

    { path: "leaderboard", component: LeaderboardComponent, outlet: "leaderboardTab" },
    { path: "donate", component: DonateComponent, outlet: "donateTab" },
    { path: "search", component: SearchComponent, outlet: "searchTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
