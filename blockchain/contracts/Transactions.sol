// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
  uint256 transactionsCount;

  event Transfer(address from, address to, uint amount, string gifUrl, uint256 timestamp, uint256 votes);

  struct TransferStruct {
    address from;
    address to;
    uint amount;
    string gifUrl;
    uint256 timestamp;
    uint256 votes;
  }

  TransferStruct[] transactions;

  function addToBlockchain(address payable to, uint amount, string memory gifUrl, uint votes) public {
    transactionsCount += 1;
    transactions.push(TransferStruct(msg.sender, to, amount, gifUrl, block.timestamp, votes));

    emit Transfer(msg.sender, to, amount, gifUrl, block.timestamp, votes);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionsCount() public view returns (uint256) {
    return transactionsCount;
  }

}