// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract NFTAuction {
    uint256 private constant MAX_BID_DURATION = 7 days;

    IERC721 public immutable nft;
    uint256 public immutable nftId;

    address payable public immutable seller;
    uint256 public immutable startingPrice;
    uint256 public immutable discountRate;
    uint256 public immutable startingAt;
    uint256 public immutable endingAt;

    constructor(
        uint256 _startingPrice,
        uint256 _discountRate,
        address _nft,
        uint256 _nftId
    ) {
        seller = payable(msg.sender);
        startingPrice = _startingPrice;
        discountRate = _discountRate;
        startingAt = block.timestamp;
        endingAt = block.timestamp + MAX_BID_DURATION;

        require(
            _startingPrice >= _discountRate * MAX_BID_DURATION,
            "Starting price is too low"
        );

        nft = IERC721(_nft);
        nftId = _nftId;
    }

    function getPrice() public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - startingAt;
        uint256 discount = discountRate * timeElapsed;

        return startingPrice - discount;
    }

    function buy() external payable {
        require(block.timestamp < endingAt, "Auction ended");

        uint256 price = getPrice();
        require(msg.value >= price, "Not enough ether sent");

        nft.transferFrom(seller, msg.sender, nftId);

        uint256 refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        selfdestruct(seller);
    }
}
