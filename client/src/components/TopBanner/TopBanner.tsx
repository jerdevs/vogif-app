import AddGif from "../AddGif/AddGif";
import WalletCard from "../WalletCard/WalletCard";

const TopBanner: React.FC = (): React.ReactElement => {
  const connectWallet = (): void => {
    console.log("connect wallet");
  };

  return (
    <div className="bg-slate-800 p-12 lg:px-28">
      <div className="flex justify-center items-center pb-10">
        <div className="sm:text-2xl font-bold uppercase text-white text-center italic">
          Vote for your favourite GIPHY!
        </div>
        <img
          className="h-8 w-8 ml-3"
          src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
          alt="Heart_GIF"
        />
      </div>
      <div className="2xl:flex xl:flex lg:flex">
        <div className="2xl:pr-10 xl:pr-10 lg:pr-10 lg:pb-0 md:pb-10 sm:pb-6 lg:items-start sm:flex sm:flex-col sm:items-center">
          <div className="flex justify-center">
            <WalletCard />
          </div>
          <div className="pt-6 flex justify-center">
            <button
              className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-teal-400 text-teal-400"
              type="submit"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          </div>
        </div>
        <AddGif />
      </div>
    </div>
  );
};

export default TopBanner;
