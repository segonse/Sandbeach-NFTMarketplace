// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

contract TransferFunds {
    uint256 transactionCount;

    event TransferEvent(
        address indexed from,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferFundsStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferFundsStruct[] transactions;

    function addDataToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message
    ) public {
        // require(amount > 0, "Amount must be greater than 0");

        // bool sent = payable(receiver).send(amount);
        // require(sent, "Failed to send Ether");
        transactionCount++;

        transactions.push(
            TransferFundsStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit TransferEvent(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferFundsStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
