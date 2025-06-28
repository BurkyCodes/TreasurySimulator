import { signal } from "@angular/core";
import { Account, Transfer } from "../models/AccountModel";

export const accountsSignal = signal<Account[]>([
      {
    id: '1',
    name: 'Mpesa_KES_1',
    currency: 'KES',
    balance: 100000
  },
  {
    id: '2',
    name: 'Bank_KES_2',
    currency: 'KES',
    balance: 85000
  },
  {
    id: '3',
    name: 'Wallet_KES_3',
    currency: 'KES',
    balance: 65000
  },
  {
    id: '4',
    name: 'Bank_USD_1',
    currency: 'USD',
    balance: 12000
  },
  {
    id: '5',
    name: 'Paypal_USD_2',
    currency: 'USD',
    balance: 8000
  },
  {
    id: '6',
    name: 'Stripe_USD_3',
    currency: 'USD',
    balance: 10000
  },
  {
    id: '7',
    name: 'Bank_NGN_1',
    currency: 'NGN',
    balance: 500000
  },
  {
    id: '8',
    name: 'Opay_NGN_2',
    currency: 'NGN',
    balance: 350000
  },
  {
    id: '9',
    name: 'Paga_NGN_3',
    currency: 'NGN',
    balance: 275000
  },
  {
    id: '10',
    name: 'Reserve_KES_4',
    currency: 'KES',
    balance: 200000
  }
])

export const transactionSignal = signal<Transfer[]>([]);