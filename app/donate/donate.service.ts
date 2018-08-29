import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Charity } from "~/models/charity.model";

@Injectable()
export class DonateService {
    queryCharities(query: string, skip: number, take: number): Observable<Charity[]> {
        return of([]);
    }

    getTopCharities(skip: number, take: number): Observable<Charity[]> {
        return of([
            {
                "name": "ASPCA"
            },
            {
                "name": "Save the Children"
            },
            {
                "name": "Albatross United"
            }
        ]);
    }
}