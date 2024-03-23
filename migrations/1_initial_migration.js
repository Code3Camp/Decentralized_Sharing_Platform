var Migrations = artifacts.require("./Migrations");

module.exports = function(deployer){
    deployer.deploy(Migrations).then((instance) => {
        console.log("Contract deployed at address:", instance.address);
      });
};
