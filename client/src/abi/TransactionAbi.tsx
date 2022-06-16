import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/Constants";

export const { ethereum } = window;

export const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
