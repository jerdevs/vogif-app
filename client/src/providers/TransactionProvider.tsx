import * as React from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ethereum, getEthereumContract } from "../abi/TransactionAbi";
import { AddGifForm } from "../components/AddGif/AddGif";
import { ethers } from "ethers";
import {
  TransactionProviderProps,
  SubmitGifState,
  BlockchainTransaction,
  Transaction,
} from "./TransactionProvider.interfaces";

const TransactionProvider: React.FC<TransactionProviderProps> = (
  props: TransactionProviderProps
) => {
  const { children } = props;
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [submitGif, setSubmitGif] = React.useState<SubmitGifState>({
    gifUrl: "",
    loading: false,
    success: false,
    error: false,
  });
  const [transactionCount, setTransactionCount] = React.useState(
    localStorage.getItem("transactionCount") || ""
  );
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect((): void => {
    checkIsWalletConnected();
    checkIfTransactionsExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect((): void => {
    if (submitGif.error || submitGif.success) {
      setTimeout((): void => {
        setSubmitGif({
          ...submitGif,
          gifUrl: "",
          error: false,
          success: false,
        });
      }, 5000);
    }
  }, [submitGif]);

  const metamaskAlert = (): void => {
    if (!ethereum) return alert("Please install metamask");
  };

  const checkIsWalletConnected = async (): Promise<void> => {
    try {
      metamaskAlert();

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("No metamask installed");
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      metamaskAlert();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      getAllTransactions();
    } catch (error) {
      console.error("No metamask installed - unable to connect wallet");
    }
  };

  const connectNewWallet = async (): Promise<void> => {
    try {
      metamaskAlert();
      const accounts = await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      setCurrentAccount(accounts[0]);
      getAllTransactions();
    } catch (error) {
      console.error("No metamask installed - unable to connect wallet");
    }
  };

  const checkIfTransactionsExist = async (): Promise<void> => {
    try {
      const transactionContract = getEthereumContract();
      const transactionsCount =
        await transactionContract.getTransactionsCount();
      window.localStorage.setItem(
        "transactionCount",
        transactionsCount.toString()
      );
    } catch (error) {
      console.error("No metamask installed - unable to retrieve transactions");
    }
  };

  const getVotesToSubmit = (amount: number): number => {
    return amount * 10000;
  };

  const submitAddGif = async (data: AddGifForm): Promise<void> => {
    try {
      metamaskAlert();
      const { addressTo, gifUrl, amount } = data;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount.toString());

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // gas values on the ethereum network are in hexadecimal, "0x5208 is 21000 GWEI"
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        gifUrl,
        getVotesToSubmit(amount)
      );
      setSubmitGif({
        ...submitGif,
        gifUrl,
        loading: true,
      });
      await transactionHash.wait();
      setSubmitGif({
        ...submitGif,
        gifUrl: "",
        loading: false,
        success: true,
      });

      const transCount = await transactionContract.getTransactionsCount();
      setTransactionCount(transCount);
      getAllTransactions();
    } catch (error) {
      console.error("No metamask installed - transaction error");
    }
  };

  const getAllTransactions = async (): Promise<void> => {
    try {
      metamaskAlert();
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions: Transaction[] = availableTransactions.map(
        (transaction: BlockchainTransaction): Transaction => ({
          to: transaction.to,
          from: transaction.from,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          gifUrl: transaction.gifUrl,
          votes: parseInt(transaction.votes._hex, 16),
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("No metamask installed - unable to retrieve transactions");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        submitAddGif,
        submitGif,
        transactionCount,
        transactions,
        connectNewWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
