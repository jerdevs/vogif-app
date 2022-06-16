import React from "react";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  SubmitGifState,
  Transaction,
} from "../../providers/TransactionProvider.interfaces";
import { getTransactions } from "../../utils/App.utils";
import GifCard, { GifCardProps } from "../GifCard/GifCard";

interface LeaderboardProps {
  transactions: Transaction[];
  onVote?: (gifUrl: string) => void;
  submitGif: SubmitGifState;
}

const Leaderboard: React.FC<LeaderboardProps> = (
  props: LeaderboardProps
): React.ReactElement => {
  const navigate = useNavigate();
  const {
    transactions,
    onVote,
    submitGif: { gifUrl, loading },
  } = props;

  const getIconClassName = (index: number): string => {
    switch (index) {
      case 0:
        return "h-5 w-5 sm:h-7 sm:w-7 text-zinc-400";
      case 1:
        return "h-6 w-6 sm:h-8 sm:w-8 text-yellow-400";
      case 2:
        return "h-4 w-4 sm:h-6 sm:w-6 text-amber-900";
    }
    return "";
  };

  const getLeaderboardGifs = (): GifCardProps[] => {
    let topGifs: Transaction[] = getTransactions(transactions).slice(0, 3);
    const topGif = topGifs[0];
    topGifs[0] = topGifs[1];
    topGifs[1] = topGif;

    return topGifs.map(
      (transaction: Transaction, index: number): GifCardProps => ({
        imgUrl: transaction.gifUrl,
        alt: transaction.gifUrl,
        icon: <FaCrown className={getIconClassName(index)} />,
        votes: transaction.votes,
      })
    );
  };

  const viewAllTransactions = (): void => {
    navigate("/transactions");
  };

  return (
    <>
      {!!transactions.length && (
        <div className="p-12 lg:px-28">
          <div className="text-2xl font-bold uppercase text-slate-800 text-center italic">
            The Top 3 GIPHYs
          </div>
          <div className="text-slate-800 text-center pt-3 text-sm">
            Each vote costs you 0.0001 ETH
          </div>
          <div className="sm:flex sm:items-center sm:gap-10 pt-10">
            {getLeaderboardGifs().map(
              (gif: GifCardProps, index: number): React.ReactElement => {
                return (
                  <div className="sm:w-2/6 py-3 sm:py-0" key={index}>
                    <GifCard
                      imgUrl={gif.imgUrl}
                      alt={gif.alt}
                      icon={gif.icon}
                      votes={gif.votes}
                      isLeaderboard
                      onVote={onVote}
                      disabled={loading && gifUrl === gif.imgUrl}
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 h-12 mt-10 text-sm sm:text-base uppercase font-semibold tracking-wider border-2 border-slate-800 text-slate-800"
              type="submit"
              onClick={viewAllTransactions}
            >
              View all transactions
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
