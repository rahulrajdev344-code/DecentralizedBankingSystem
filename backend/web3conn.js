const Web3 = require("web3");
const contract = require("truffle-contract");
const artifacts = require("./build/Functions.json");

// Use Alchemy Sepolia RPC for production
const ALCHEMY_URL = process.env.ALCHEMY_URL || "https://eth-sepolia.g.alchemy.com/v2/PypPPIrep6rmbCH7w5-FP";

if (typeof web3 !== "undefined") {
	var web3 = new Web3(web3.currentProvider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_URL));
}
const LMS = contract(artifacts);
LMS.setProvider(web3.currentProvider);

const deploy = async (accounts, lms) => {
	accounts = await web3.eth.getAccounts();
	lms = await LMS.deployed();
};

module.exports = { LMS, web3 };
