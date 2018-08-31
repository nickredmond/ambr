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
                "name": "ASPCA",
                "imageSource": "https://yt3.ggpht.com/a-/ACSszfEfeCYUch7EDA1EthYdxHUKsoF_nqFhHm8nKA=s900-mo-c-c0xffffffff-rj-k-no",
                "description": "Learn more about the ASPCA's work to rescue animals from abuse, pass humane laws and share resources with shelters nationwide. Join our fight today!"
            },
            {
                "name": "Save the Children",
                "imageSource": "https://yt3.ggpht.com/a-/ACSszfFgLdwqtuClzRmqwidtgaTJPsMomFny3hVkZA=s900-mo-c-c0xffffffff-rj-k-no",
                "description": "Join Save the Children to give girls and boys in the United States and around the world a healthy start, an education, and protection from harm."
            },
            {
                "name": "UNICEF",
                "imageSource": "https://ceowatermandate.org/wp-content/uploads/2017/08/UNICEF-logo.jpg",
                "description": "UNICEF works in 190 countries and territories to save children’s lives, to defend their rights, and to help them fulfil their potential, from early childhood through adolescence. And we never give up."
            }
        ]);
    }
}