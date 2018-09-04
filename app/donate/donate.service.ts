import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Charity } from "~/models/charity.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DonateService {
    constructor(private httpClient: HttpClient) {}

    queryCharities(query: string, skip: number, take: number): Observable<Charity[]> {
        return this.requestCharities(query, skip, take);
    }

    getTopCharities(skip: number, take: number): Observable<Charity[]> {
        return this.requestCharities(null, skip, take);
    }

    private requestCharities(queryText: string, skip: number, take: number): Observable<Charity[]> {
        const options = {
            // DO NOT COMMIT API-KEY
            headers: { "x-api-key": "1qpEd4yMkU1J7IOvb4qSb8lwCn7lUEA51cfMUhG4" }
        };
        const requestBody = {
            text: queryText,
            skip,
            take
        };
        // ALSO DON'T COMMIT URL
        const charitiesQueryUrl = "https://494emnupx8.execute-api.us-east-1.amazonaws.com/beta/ambr-mongo-queryCharities";
        return <Observable<Charity[]>>this.httpClient.post(charitiesQueryUrl, requestBody, options);
    }
}