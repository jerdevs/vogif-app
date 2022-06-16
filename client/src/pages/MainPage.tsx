import * as React from "react";
import GifGrid from "../components/GifGrid/GifGrid";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import TopBanner from "../components/TopBanner/TopBanner";
import { TransactionContext } from "../context/TransactionContext";

const MainPage: React.FC = (): React.ReactElement => {
  const { transactions, submitAddGif, submitGif } =
    React.useContext(TransactionContext);

  const onVote = (gifUrl: string): void => {
    submitAddGif &&
      submitAddGif({
        addressTo: process.env.REACT_APP_METAMASK_ACCOUNT || "",
        gifUrl,
        amount: 0.0001,
      });
  };

  return (
    <div className="font-mono">
      <TopBanner />
      <Leaderboard
        transactions={transactions}
        onVote={onVote}
        submitGif={submitGif}
      />
      <GifGrid
        transactions={transactions}
        onVote={onVote}
        submitGif={submitGif}
      />
    </div>
  );
};

export default MainPage;
