// Import web3.js
const Web3 = require('web3');

// Connect to Ethereum provider (like MetaMask or a local node)
const web3 = new Web3("https://mainnet.infura.io/v3/000c783b8b904f2fae87a9e003f5b275");

// Load the ABI of your contrac
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_image",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "createListing",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "listingId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                }
            ],
            "name": "ListingCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                }
            ],
            "name": "getListing",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Market.Listing[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getListings",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Market.Listing[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "listings",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "numberOfListings",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

// Define your contract address
const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

// Instantiate your contract object
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call the createListing function
function createListing(_owner, _description, _image, _username, _email) {
    contract.methods.createListing(_owner, _description, _image, _username, _email)
        .send({ from: '0x42311146D33A1612Ac6773B8c375CFCd99464723' })
        .then((receipt) => {
            console.log('Listing created:', receipt);
        })
        .catch((error) => {
            console.error('Error creating listing:', error);
        });
}

// Call the getListing function
function getListing(_username) {
    contract.methods.getListing(_username)
        .call()
        .then((listings) => {
            console.log('Listings for username', _username, ':', listings);
        })
        .catch((error) => {
            console.error('Error getting listings:', error);
        });
}

// Call the getListings function
function getListings() {
    contract.methods.getListings()
        .call()
        .then((listings) => {
            console.log('All listings:', listings);
        })
        .catch((error) => {
            console.error('Error getting all listings:', error);
        });
}

// Example usage
createListing('OWNER_ADDRESS', 'Description', 'Image URL', 'Username', 'Email');
getListing('Username');
getListings();
