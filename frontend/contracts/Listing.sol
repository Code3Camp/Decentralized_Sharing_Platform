// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Market {
    struct Listing {
        string username;
        string description;
        address owner;
        string image;
        string email; 
    }

    mapping (uint256 => Listing) public listings;
    uint256 public numberOfListings;

    constructor() {
        numberOfListings = 0;
    }

    event ListingCreated(uint256 indexed listingId, address indexed owner, string username, string description, string image, string email);    

    function createListing(address _owner, string memory _description, string memory _image, string memory _username, string memory _email) public returns(uint256) {
        Listing storage listing = listings[numberOfListings];

        listing.username = _username;
        listing.description = _description;
        listing.owner = _owner;
        listing.image = _image;
        listing.email = _email; // Assign email

        emit ListingCreated(numberOfListings, msg.sender, _username, _description, _image, _email);
        
        numberOfListings++;
        return numberOfListings - 1;
    }

    function getListing(string memory _username) public view returns(Listing[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < numberOfListings; i++) {
            if (keccak256(abi.encodePacked(listings[i].username)) == keccak256(abi.encodePacked(_username))) {
                count++;
            }
        }
        
        Listing[] memory result = new Listing[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < numberOfListings; i++) {
            if (keccak256(abi.encodePacked(listings[i].username)) == keccak256(abi.encodePacked(_username))) {
                result[index] = listings[i];
                index++;
            }
        }
        return result;
    }

    function getListings() public view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](numberOfListings);
        for (uint i = 0; i < numberOfListings; i++ ){
            Listing storage item = listings[i];
            allListings[i] = item;
        }

        return allListings;
    }
}