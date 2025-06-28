export type Currency = 'KES' | 'USD' | 'NGN';

export interface Account {
  id: string;
  name: string;
  currency: Currency;
  balance: number;
}


export interface Transfer {
  id: string;
  from: string;
  to: string;
  amount: number;
  note?: string;
  date: string;
}
