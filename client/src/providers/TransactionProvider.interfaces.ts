export interface TransactionProviderProps {
  children: React.ReactNode;
}

export interface SubmitGifState {
  gifUrl: string;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface TransactionUint {
  _hex: string;
  _isBigNumber: boolean;
}

export interface BlockchainTransaction {
  to: string;
  from: string;
  timestamp: any;
  gifUrl: string;
  votes: TransactionUint;
  amount: TransactionUint;
}

export interface Transaction {
  gifUrl: string;
  votes: number;
  to?: string;
  from?: string;
  timestamp?: string;
  amount?: number;
}

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: boolean;
}
