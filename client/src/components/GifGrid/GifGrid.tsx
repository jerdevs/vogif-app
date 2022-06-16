import {
  SubmitGifState,
  Transaction,
} from "../../providers/TransactionProvider.interfaces";
import { getTransactions } from "../../utils/App.utils";
import GifCard, { GifCardProps } from "../GifCard/GifCard";

interface GifGridProps {
  transactions: Transaction[];
  onVote?: (gifUrl: string) => void;
  submitGif: SubmitGifState;
}

const GifGrid: React.FC<GifGridProps> = (
  props: GifGridProps
): React.ReactElement => {
  const {
    transactions,
    onVote,
    submitGif: { gifUrl, loading },
  } = props;

  const getGifs = (): GifCardProps[] => {
    let gifs: Transaction[] = getTransactions(transactions).slice(
      3,
      transactions.length
    );

    return gifs.map(
      (transaction: Transaction): GifCardProps => ({
        imgUrl: transaction.gifUrl,
        alt: transaction.gifUrl,
        votes: transaction.votes,
      })
    );
  };

  return (
    <>
      {transactions.length > 3 && (
        <div className="bg-slate-800 p-12 lg:px-28">
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols gap-x-8 gap-y-4">
            {getGifs().map(
              (gif: GifCardProps, index: number): React.ReactElement => {
                return (
                  <GifCard
                    key={index}
                    imgUrl={gif.imgUrl}
                    alt={gif.alt}
                    votes={gif.votes}
                    onVote={onVote}
                    disabled={loading && gifUrl === gif.imgUrl}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GifGrid;
