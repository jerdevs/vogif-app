import { FaEthereum } from "react-icons/fa";
import { WalletCardStyled } from "./WalletCard.styled";

const WalletCard: React.FC = (): React.ReactElement => {
  return (
    <WalletCardStyled className="h-52 w-96 rounded-lg p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-slate-800 flex justify-center items-center">
            <FaEthereum color="#1e293b" />
          </div>
          <div className="italic pl-3 uppercase font-bold tracking-widest">
            VOGIF card
          </div>
        </div>
        <div>
          <p className="text-slate-800 font-light text-sm">Address</p>
          <p className="text-slate-800 font-semibold text-lg mt-1">Ethereum</p>
        </div>
      </div>
    </WalletCardStyled>
  );
};

export default WalletCard;
