import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule, COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { LeaderboardService } from "~/leaderboard/leaderboard.service";
import { DonateService } from "~/donate/donate.service";
import { HttpClientModule } from "@angular/common/http";
import { NavigationData } from "~/models/navigation.data";
import { UserService } from "~/shared/user.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        CoreModule,
        HttpClientModule
    ],
    providers: [
        LeaderboardService,
        DonateService,
        UserService,
        NavigationData
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
