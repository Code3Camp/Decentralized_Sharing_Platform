// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Market {
    struct Listing {
        string name;
        string description;
        address owner;
        string image;
    }

    mapping (uint256 => Listing) public listings;
    uint256 public numberOfListings;

    constructor() {
        numberOfListings = 0;
    }

    event ListingCreated(uint256 indexed listingId, address indexed owner, string name, string description, string image);    

    function createListing(address _owner, string memory _description, string memory _image, string memory _name) public returns(uint256) {
        Listing storage listing = listings[numberOfListings];

        listing.name = _name;
        listing.description = _description;
        listing.owner = _owner;
        listing.image = _image;

        emit ListingCreated(numberOfListings, msg.sender, _name, _description, _image);
        
        numberOfListings++;
        return numberOfListings - 1;
    }

    function getListing(string memory _name) public view returns(Listing[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < numberOfListings; i++) {
            if (keccak256(abi.encodePacked(listings[i].name)) == keccak256(abi.encodePacked(_name))) {
                count++;
            }
        }
        
        Listing[] memory result = new Listing[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < numberOfListings; i++) {
            if (keccak256(abi.encodePacked(listings[i].name)) == keccak256(abi.encodePacked(_name))) {
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


