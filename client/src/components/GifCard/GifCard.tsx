import { AiOutlineLink } from "react-icons/ai";

export interface GifCardProps {
  imgUrl: string;
  alt: string;
  votes: number;
  icon?: React.ReactElement;
  isLeaderboard?: boolean;
  onVote?: (gifUrl: string) => void;
  disabled?: boolean;
}

const GifCard: React.FC<GifCardProps> = (
  props: GifCardProps
): React.ReactElement => {
  const { imgUrl, alt, votes, icon, isLeaderboard, onVote, disabled } = props;

  return (
    <div className="flex items-center">
      <div
        className={`w-full shadow-md border-2 ${
          isLeaderboard ? "border-slate-800" : "border-teal-400"
        }`}
      >
        <div className="relative">
          <img className="w-full" src={imgUrl} alt={alt} />
          <a href={imgUrl} target="_blank" rel="noreferrer">
            <AiOutlineLink className="text-teal-400 absolute top-4 right-4 hover:scale-125" />
          </a>
        </div>
        <div className="py-6">
          <div className="flex items-center justify-center">
            {icon}
            <div
              className={`font-bold italic pl-4 ${
                isLeaderboard
                  ? "text-base sm:text-lg md:text-xl text-slate-800"
                  : "text-base text-white"
              }`}
            >
              {votes.toLocaleString()} {votes === 1 ? "vote" : "votes"}
            </div>
          </div>
          <div className="flex justify-center pt-3">
            <button
              className={`px-6 py-1 text-sm sm:text-base uppercase font-semibold tracking-wider border-2 ${
                disabled
                  ? "border-slate-400 text-slate-400"
                  : isLeaderboard
                  ? "border-slate-800 text-slate-800"
                  : "border-teal-400 text-teal-400"
              }`}
              type="submit"
              onClick={(): void => onVote && onVote(imgUrl)}
              disabled={disabled}
            >
              {disabled ? "Voting..." : "Vote"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifCard;
