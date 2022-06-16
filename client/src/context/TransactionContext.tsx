import * as React from "react";
import { AddGifForm } from "../components/AddGif/AddGif";
import {
  SubmitGifState,
  Transaction,
} from "../providers/TransactionProvider.interfaces";

interface TransactionContextType {
  currentAccount: string;
  submitGif: SubmitGifState;
  transactionCount: string;
  transactions: Transaction[];
  connectWallet?: () => void;
  submitAddGif?: (data: AddGifForm) => void;
  connectNewWallet?: () => void;
}

export const TransactionContext = React.createContext<TransactionContextType>({
  currentAccount: "",
  submitGif: {
    gifUrl: "",
    success: false,
    loading: false,
    error: false,
  },
  transactionCount: "",
  transactions: [],
});
