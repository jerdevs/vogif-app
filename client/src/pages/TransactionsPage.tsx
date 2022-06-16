import * as React from "react";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { Transaction } from "../providers/TransactionProvider.interfaces";
import { reverseArr, shortenAddress } from "../utils/App.utils";

const TransactionsPage: React.FC = (): React.ReactElement => {
  const { transactions } = React.useContext(TransactionContext);
  const navigate = useNavigate();

  const backToVotingPage = (): void => {
    navigate("/");
  };

  return (
    <div className="font-mono">
      {!!transactions.length && (
        <div className="p-12 px-6 md:px-14 lg:px-28">
          <div className="text-2xl font-bold uppercase text-slate-800 text-center italic">
            All VOGIF Transactions
          </div>
          <div className="overflow-auto shadow mt-10">
            <table className="w-full text-sm sm:text-base text-slate-800">
              <thead>
                <tr className="bg-slate-800 text-teal-400">
                  <th className="border border-slate-300 py-1">No.</th>
                  <th className="border border-slate-300 py-1">Address from</th>
                  <th className="border border-slate-300 py-1">Address to</th>
                  <th className="border border-slate-300 py-1">GIF URL</th>
                  <th className="border border-slate-300 py-1">Amount</th>
                  <th className="border border-slate-300 py-1">Votes</th>
                  <th className="border border-slate-300 py-1">
                    Date &amp; time
                  </th>
                </tr>
              </thead>
              <tbody>
                {reverseArr(transactions).map(
                  (
                    transaction: Transaction,
                    index: number
                  ): React.ReactElement => {
                    return (
                      <tr
                        key={index}
                        className={`${index % 2 !== 0 ? "bg-slate-200" : ""}`}
                      >
                        <td className="py-2 border border-slate-300 text-center px-2 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          {shortenAddress(transaction.from)}
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          {shortenAddress(transaction.to)}
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          <a
                            href={transaction.gifUrl}
                            target="_blank"
                            className="hover:text-teal-400"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          {transaction.amount}
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          {transaction.votes}
                        </td>
                        <td className="border border-slate-300 px-2 text-center whitespace-nowrap">
                          {transaction.timestamp}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 h-12 mt-10 text-sm sm:text-base uppercase font-semibold tracking-wider border-2 border-slate-800 text-slate-800"
              type="submit"
              onClick={backToVotingPage}
            >
              Back to voting page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
