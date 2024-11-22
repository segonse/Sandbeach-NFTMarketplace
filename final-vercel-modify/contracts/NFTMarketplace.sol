// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// NFTMarketplace contract for handling NFT minting, listing, and sales
contract NFTMarketplace is ERC721URIStorage {
    ////////////////////////
    // State variables    //
    ////////////////////////

    // Tracks the number of tokens created
    uint256 s_tokenCounter;
    // Tracks the number of items sold
    uint256 s_itemsSold;

    // The fixed listing fee for market item creation
    uint256 s_listingPrice = 0.0015 ether;

    // Owner of the contract
    address payable s_owner;

    // Mapping from tokenId to market item details
    mapping(uint256 => MarketItem) s_idToMarketItem;

    // Struct representing a market item
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    /////////////////
    // Events      //
    /////////////////

    // Emitted when a market item is created
    event IdMarketItemCreate(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    //////////////////
    // Modifiers    //
    //////////////////

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        if (msg.sender != s_owner) {
            revert("Not owner!");
        }
        _;
    }

    // Modifier to check if the provided value matches the listing price
    modifier equalListingPrice() {
        if (msg.value != s_listingPrice) {
            revert("Fee must be equal listing price!");
        }
        _;
    }

    //////////////////
    // Functions    //
    //////////////////

    // Constructor to initialize the NFT collection
    constructor() ERC721("Sandbeach NFT", "SBN") {
        s_tokenCounter = 0;
        s_itemsSold = 0;
        s_owner = payable(msg.sender); // Sets the contract owner to the deployer
    }

    ///////////////////////////
    // External Functions    //
    ///////////////////////////

    /*
     * @param _listingPrice: The new listing price to set for creating market items
     * @notice This function allows the owner to update the listing price
     */
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        s_listingPrice = _listingPrice;
    }

    /*
     * @param _tokenURI: The metadata URI for the newly minted NFT
     * @param price: The price at which the NFT should be listed
     * @return The newly created tokenId
     * @notice This function mints a new NFT and lists it as a market item
     */
    function createTokenAndMarketItem(
        string memory _tokenURI,
        uint256 price
    ) public payable equalListingPrice returns (uint256) {
        uint256 newTokenId = s_tokenCounter; // Generate new tokenId
        _mint(msg.sender, newTokenId); // Mint the NFT to the caller
        _setTokenURI(newTokenId, _tokenURI); // Set the token URI

        // Create and list the market item
        createMarketItem(newTokenId, price);

        s_tokenCounter++; // Increment the token counter

        return newTokenId;
    }

    /*
     * @param tokenId: The tokenId of the NFT to be resold
     * @param price: The new price to list the NFT for
     * @notice This function allows an NFT owner to resell their token by re-listing it
     */
    function resellToken(
        uint256 tokenId,
        uint256 price
    ) public payable equalListingPrice {
        require(
            msg.sender == s_idToMarketItem[tokenId].owner,
            "Only item owner can perform this operation!"
        );

        // Update the market item details for resale
        s_idToMarketItem[tokenId].seller = payable(msg.sender);
        s_idToMarketItem[tokenId].owner = payable(address(this));
        s_idToMarketItem[tokenId].price = price;
        s_idToMarketItem[tokenId].sold = false;

        s_itemsSold--; // Decrease the number of sold items

        _transfer(msg.sender, address(this), tokenId); // Transfer the NFT back to the marketplace
    }

    /*
     * @param tokenId: The tokenId of the NFT to purchase
     * @notice This function allows a user to purchase an NFT by submitting the asking price
     */
    function createMarketSale(uint256 tokenId) public payable {
        require(
            msg.value == s_idToMarketItem[tokenId].price,
            "Please submit the asking price in order to complete the purchase!"
        );

        require(
            s_idToMarketItem[tokenId].owner != address(0),
            "NFT does not exist!"
        );

        require(s_idToMarketItem[tokenId].sold == false, "NFT already sold!");

        // Transfer ownership of the NFT to the buyer
        s_idToMarketItem[tokenId].owner = payable(msg.sender);
        s_idToMarketItem[tokenId].seller = payable(address(0));
        s_idToMarketItem[tokenId].sold = true;

        s_itemsSold++; // Increment the number of sold items

        _transfer(address(this), msg.sender, tokenId); // Transfer the NFT to the buyer

        // Transfer the listing fee to the contract owner and the sale amount to the seller
        payable(s_owner).transfer(s_listingPrice);
        payable(s_idToMarketItem[tokenId].owner).transfer(msg.value);
    }

    //////////////////////////
    // Private Functions   ///
    //////////////////////////

    /*
     * @param tokenId: The tokenId of the NFT being listed
     * @param price: The price at which the NFT should be listed
     * @notice This function handles the creation of a market item
     */
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must more than zero!");

        // Create the market item and store it in the mapping
        s_idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        // Emit an event for market item creation
        emit IdMarketItemCreate(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );

        // Transfer the NFT from the seller to the marketplace
        _transfer(msg.sender, address(this), tokenId);
    }

    //////////////////////////////////////////
    // Public & External View Functions     //
    //////////////////////////////////////////

    /*
     * @return A list of all unsold market items
     * @notice This function returns an array of all NFTs currently listed for sale
     */
    function getMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = s_tokenCounter; // Total number of tokens
        uint256 unSoldItemCount = itemCount - s_itemsSold; // Calculate the unsold items
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unSoldItemCount); // Create a dynamic array to store unsold items

        // Iterate through all tokens and find unsold items
        for (uint256 i = 0; i < itemCount; i++) {
            if (s_idToMarketItem[i].owner == address(this)) {
                items[currentIndex] = s_idToMarketItem[i];
                currentIndex++;
            }
        }

        return items;
    }

    /*
     * @return A list of NFTs owned by the caller
     * @notice This function returns all the NFTs owned by the caller
     */
    function getMyToken(
        address owner
    ) public view returns (MarketItem[] memory) {
        uint256 itemCount = s_tokenCounter; // Total number of tokens

        // Count the number of tokens owned by the caller
        uint256 ownedItemCount = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (s_idToMarketItem[i].owner == owner) {
                ownedItemCount++;
            }
        }

        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](ownedItemCount);

        // Find tokens owned by the caller
        for (uint256 i = 0; i < itemCount; i++) {
            if (s_idToMarketItem[i].owner == owner) {
                items[currentIndex] = s_idToMarketItem[i];
                currentIndex++;
            }
        }

        return items;
    }

    /*
     * @return A list of market items listed by the caller
     * @notice This function returns all the market items listed for sale by the caller
     */
    function getMyMarketItems(
        address seller
    ) public view returns (MarketItem[] memory) {
        uint256 itemCount = s_tokenCounter;
        uint256 myMarketItemCount = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (s_idToMarketItem[i].seller == seller) {
                myMarketItemCount++;
            }
        }

        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](myMarketItemCount);

        // Find market items listed by the caller
        for (uint256 i = 0; i < itemCount; i++) {
            if (s_idToMarketItem[i].seller == seller) {
                items[currentIndex] = s_idToMarketItem[i];
                currentIndex++;
            }
        }

        return items;
    }

    function getListingPrice() public view returns (uint256) {
        return s_listingPrice;
    }
}
