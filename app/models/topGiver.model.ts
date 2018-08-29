import { Giver } from "~/models/giver.model";

export interface TopGiver extends Giver {
    amountDonated: string;    
}