export interface GifCardProps {
  imgUrl: string;
  alt: string;
  votes: number;
  icon?: React.ReactElement;
  isLeaderboard?: boolean;
}

const GifCard: React.FC<GifCardProps> = (
  props: GifCardProps
): React.ReactElement => {
  const { imgUrl, alt, votes, icon, isLeaderboard } = props;

  const voteGif = (): void => {
    console.log("vote");
  };

  return (
    <div className="flex items-center">
      <div
        className={`w-full shadow-md border-2 ${
          isLeaderboard ? "border-slate-800" : "border-teal-400"
        }`}
      >
        <img className="w-full" src={imgUrl} alt={alt} />
        <div className="py-6">
          <div className="flex items-center justify-center">
            {icon}
            <div
              className={`font-bold italic pl-4 ${
                isLeaderboard
                  ? "text-xl sm:text-base md:text-xl text-slate-800"
                  : "text-base text-white"
              }`}
            >
              {votes.toLocaleString()} {votes === 1 ? "vote" : "votes"}
            </div>
          </div>
          <div className="flex justify-center pt-3">
            <button
              className={`px-6 py-1 uppercase font-semibold tracking-wider border-2 ${
                isLeaderboard
                  ? "border-slate-800 text-slate-800"
                  : "border-teal-400 text-teal-400"
              }`}
              type="submit"
              onClick={voteGif}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifCard;
