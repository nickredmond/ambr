import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { DonateComponent } from "./donate/donate.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { SearchComponent } from "./search/search.component";
import { CharityComponent } from "~/charity/charity.component";
import { PaymentComponent } from "~/payment/payment.component";
import { LoginComponent } from "~/login/login.component";
import { AppComponent } from "~/app.component";
import { HomeComponent } from "~/home/home.component";

export const COMPONENTS = [DonateComponent, LeaderboardComponent, SearchComponent, CharityComponent, PaymentComponent, LoginComponent, HomeComponent];

const routes: Routes = [
    { path: "", redirectTo: "app", pathMatch: "full" },
    { path: "app", component: AppComponent },
    { path: "login", component: LoginComponent },
    // /(leaderboardTab:leaderboard//donateTab:donate//searchTab:search)
    { path: "home", component: HomeComponent },
    // , children: [
    //     { path: "leaderboard", component: LeaderboardComponent, outlet: "leaderboardTab" },
    //     { path: "donate", component: DonateComponent, outlet: "donateTab" },
    //     { path: "search", component: SearchComponent, outlet: "searchTab" }
    // ] },

    // { path: "leaderboard", component: LeaderboardComponent, outlet: "leaderboardTab" },

    // { path: "donate", component: DonateComponent, outlet: "donateTab" },
    { path: "payment", component: PaymentComponent },
    { path: "charity", component: CharityComponent },
    
    // { path: "search", component: SearchComponent, outlet: "searchTab" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
