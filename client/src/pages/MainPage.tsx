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
        addressTo: "0x736b55165486c901e566768F9E555E2720C831d1",
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
