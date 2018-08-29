import { Injectable } from "@angular/core";
import { TopGiver } from "~/models/topGiver.model";
import { Observable, of } from "rxjs";
import { TopEarner } from "~/models/topEarner.model";

@Injectable()
export class LeaderboardService {
    getMonthlyTopGiversByAmount(): Observable<TopGiver[]> {
        return of([
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
        ]);
    }

    getAllTimeTopGiversByAmount(): Observable<TopGiver[]> {
        return of([
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
        ]);
    }

    getMonthlyTopEarnersByAmount(): Observable<TopEarner[]> {
        return of([
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
        ]);
    }
}