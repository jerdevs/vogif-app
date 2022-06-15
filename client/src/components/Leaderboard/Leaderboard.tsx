import React from "react";
import { FaCrown } from "react-icons/fa";
import GifCard, { GifCardProps } from "../GifCard/GifCard";

const Leaderboard: React.FC = (): React.ReactElement => {
  const topGiphys: GifCardProps[] = [
    {
      imgUrl: "https://media.giphy.com/media/sJWNLTclcvVmw/giphy.gif",
      alt: "Top_2",
      icon: <FaCrown className="h-7 w-7 text-zinc-400" />,
      votes: 1028,
    },
    {
      imgUrl: "https://media.giphy.com/media/nbMyAHO0PAVxJ5uJmG/giphy.gif",
      alt: "Top_1",
      icon: <FaCrown className="h-8 w-8 text-yellow-400" />,
      votes: 1536,
    },
    {
      imgUrl: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
      alt: "Top_3",
      icon: <FaCrown className="h-6 w-6 text-amber-900" />,
      votes: 594,
    },
  ];

  return (
    <div className="p-12 lg:px-28">
      <div className="text-2xl font-bold uppercase text-slate-800 text-center italic">
        The Top 3 GIPHYs
      </div>
      <div className="text-slate-800 text-center pt-3 text-sm">
        Each vote costs you 0.0001 ETH
      </div>
      <div className="sm:flex sm:items-center sm:gap-10 pt-10">
        {topGiphys.map(
          (gif: GifCardProps, index: number): React.ReactElement => {
            return (
              <div className="sm:w-2/6 py-3 sm:py-0" key={index}>
                <GifCard
                  imgUrl={gif.imgUrl}
                  alt={gif.alt}
                  icon={gif.icon}
                  votes={gif.votes}
                  isLeaderboard
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
