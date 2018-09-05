import { Injectable } from "@angular/core";
import { PaymentMethod } from "~/models/paymentMethod.model";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    private paymentMethods: PaymentMethod[];
    public currentUserId: string; // todo: implement this, possibly via login

    constructor(private httpClient: HttpClient) {}

    public getSavedPaymentMethods(): Observable<PaymentMethod[]> {
        return this.paymentMethods ? of(this.paymentMethods) : this.loadSavedPaymentMethods();
    }

    private loadSavedPaymentMethods(): Observable<PaymentMethod[]> {
        // todo: implement http call to user-get-tokens lambda
        this.paymentMethods = [
            <PaymentMethod>{
                cardBrand: "MasterCard",
                lastFourDigits: 9823,
                tokenId: "card_aend9332n2s9"
            },
            <PaymentMethod>{
                cardBrand: "VISA",
                lastFourDigits: 5129,
                tokenId: "card_aend93323en9"
            }
        ];
        return of(this.paymentMethods);
    }
}