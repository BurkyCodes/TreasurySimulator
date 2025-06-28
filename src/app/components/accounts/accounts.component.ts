import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../../models/AccountModel';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { accountsSignal, transactionSignal } from '../../store/account.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { transferFunds } from '../../store/account.action';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit, OnDestroy {
  allAccounts: Account[] = [];
  loadedAccounts: Account[] = [];
  searchTerm: string = '';
  selectedCurrency = '';

  selectedAccount: Account | null = null;
  destinationId: string = '';
  transferAmount: number = 0;
  transferNote: string = '';

  showTransactionLogs = false;

  transactions$ = toObservable(transactionSignal);

  showTransferForm(account: Account) {
    this.selectedAccount = account;
    this.destinationId = '';
    this.transferAmount = 0;
    this.transferNote = '';
  }

  submitTransfer() {
    if (this.selectedAccount && this.destinationId) {
      const result = transferFunds(
        this.selectedAccount.id,
        this.destinationId,
        this.transferAmount,
        this.transferNote
      );

      if (typeof result === 'string') {
        alert(result); 
      } else {
        alert('Transfer successful');
        this.selectedAccount = null; 
      }
    }
  }

  private destroyed$ = new Subject<void>();

  constructor() {
    toObservable(accountsSignal)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((accounts) => {
        this.allAccounts = accounts;
        this.loadedAccounts = accounts;
      });
  }

  searchAccounts(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.loadedAccounts = this.allAccounts.filter((acc) => {
      const matchesName = acc.name.toLowerCase().includes(term);
      const matchesCurrency = this.selectedCurrency
        ? acc.currency === this.selectedCurrency
        : true;

      return matchesName && matchesCurrency;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
