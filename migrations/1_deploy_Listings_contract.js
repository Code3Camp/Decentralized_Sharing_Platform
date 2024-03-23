const Listing = arftifacts.require("Listings");

module.exports =  function(deployer) {
    deployer.deploy(Listing);
}