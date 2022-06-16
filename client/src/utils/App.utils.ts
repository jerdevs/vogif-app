import { Transaction } from "../providers/TransactionProvider.interfaces";
import _ from "lodash";

export const shortenAddress = (address?: string): string => {
  return address
    ? `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
    : "";
};

export const sortTransactionsByVotes = (
  transactions: Transaction[]
): Transaction[] => {
  return transactions.sort(
    (transaction1: Transaction, transaction2: Transaction): number => {
      return transaction2.votes - transaction1.votes;
    }
  );
};

export const groupTransactionsByGifUrl = (
  transactions: Transaction[]
): Transaction[] => {
  const groupedTransactionsByGifUrl: Transaction[] = [];
  const groupedTransactions: { [url: string]: Transaction[] } = _.groupBy(
    transactions,
    (transaction) => transaction.gifUrl
  );
  for (const [key, value] of Object.entries(groupedTransactions)) {
    let votes = 0;
    value.forEach((eachTransaction: Transaction): any => {
      votes += eachTransaction.votes;
    });
    groupedTransactionsByGifUrl.push({
      gifUrl: key,
      votes,
    });
  }
  return groupedTransactionsByGifUrl;
};

export const getTransactions = (transactions: Transaction[]): Transaction[] => {
  return sortTransactionsByVotes(groupTransactionsByGifUrl(transactions));
};

export const reverseArr = (arr: any[]): any[] => {
  return arr.slice().reverse();
};
