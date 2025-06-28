import { accountsSignal, transactionSignal } from './account.store';
import { Account } from '../models/AccountModel';

const fxRates: Record<string, number> = {
  USD_KES: 129.18,
  KES_USD: 1 / 129.18,
  KES_NGN: 11.95,
  NGN_KES: 1 / 11.95,
  USD_NGN: 129.18 * 11.95,
  NGN_USD: 1 / (129.18 * 11.95),
};

export function transferFunds(
  fromId: string,
  toId: string,
  amount: number,
  note?: string
): string | void {
  const accounts = accountsSignal();

  const from: Account | undefined = accounts.find((acc) => acc.id === fromId);
  const to: Account | undefined = accounts.find((acc) => acc.id === toId);

  if (!from || !to) return 'Invalid account selection';

  if (from.id === to.id) return 'Cannot transfer to the same account';
  if (amount <= 0) return 'Amount must be positive';
  if (from.balance < amount) return 'Insufficient balance';

  let convertedAmount = amount;
  if (from.currency !== to.currency) {
    const fxKey = `${from.currency}_${to.currency}`;
    const rate = fxRates[fxKey];
    if (!rate)
      return `No conversion rate from ${from.currency} to ${to.currency}`;
    convertedAmount = parseFloat((amount * rate).toFixed(2));
  }

  const updated = accounts.map((acc) =>
    acc.id === from.id
      ? { ...acc, balance: parseFloat((acc.balance - amount).toFixed(2)) }
      : acc.id === to.id
      ? {
          ...acc,
          balance: parseFloat((acc.balance + convertedAmount).toFixed(2)),
        }
      : acc
  );

  accountsSignal.set(updated);

  // Log the transaction
  transactionSignal.update((tx) => [
    ...tx,
    {
      id: crypto.randomUUID(),
      from: from.name,
      to: to.name,
      amount: convertedAmount,
      originalAmount: amount,
      fromCurrency: from.currency,
      toCurrency: to.currency,
      note: note || '',
      date: new Date().toISOString(),
    },
  ]);
}
