import React from "react";
import GifGrid from "./components/GifGrid/GifGrid";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import TopBanner from "./components/TopBanner/TopBanner";

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="font-mono">
      <TopBanner />
      <Leaderboard />
      <GifGrid />
    </div>
  );
};

export default App;
