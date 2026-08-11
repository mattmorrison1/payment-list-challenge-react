import { CURRENCIES } from "../constants/index";

export interface Payment {
    id: string;
    customerName: string;
    amount: number;
    customerAddress: string;
    currency: string;
    status: string;
    date: string;
    description: string;
}

export interface PaymentSearchResponse {
    payments: Payment[];
    total: number;
    page: number;
    pageSize: number;
}

export type Currency = typeof CURRENCIES[number];

export interface PaymentsParams {
    page?: number;
    pageSize?: number;
    search?: string;
    currency?: Currency;
};
