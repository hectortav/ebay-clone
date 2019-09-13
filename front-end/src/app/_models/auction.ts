export class Auction {
    _id?: string;
    name: string;
    category: string[];
    location: string;
    country: string;
    currently: string;
    first_bid: Number;
    no_bids?: number;
    started: Date;
    ends: Date;
    description: string;
    latitude?: number;
    longitude?: number;
    seller: string;
    bids?: string[];
}