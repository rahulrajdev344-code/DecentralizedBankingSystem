const Web3 = require("web3");
const contract = require("truffle-contract");
const artifacts = require("./build/Functions.json");
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Use Alchemy Sepolia RPC for production
const ALCHEMY_URL = process.env.ALCHEMY_URL || "https://eth-sepolia.g.alchemy.com/v2/PypPPIrep6rmbCH7w5-FP";
const MNEMONIC = process.env.MNEMONIC || "your recovery phrase here"; // Fallback only for local dev if file missing

if (typeof web3 !== "undefined") {
	var web3 = new Web3(web3.currentProvider);
} else {
	// Check if we are in production or have a mnemonic
	if (process.env.MNEMONIC) {
		const provider = new HDWalletProvider(process.env.MNEMONIC, ALCHEMY_URL);
		var web3 = new Web3(provider);
	} else {
		var web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_URL));
	}
}
const LMS = contract(artifacts);
LMS.setProvider(web3.currentProvider);

const deploy = async (accounts, lms) => {
	accounts = await web3.eth.getAccounts();
	lms = await LMS.deployed();
};

module.exports = { LMS, web3 };
