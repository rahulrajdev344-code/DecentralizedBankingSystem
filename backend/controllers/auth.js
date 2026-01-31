"use-strict";

const { LMS, web3 } = require("../web3conn");

const newId = async (req, res) => {
	try {
		const accounts = await web3.eth.getAccounts();
		const lms = await LMS.deployed();
		let result, id;
		const type = req.body.type;
		if (type == 0) {
			result = await lms.newUser({ from: accounts[0] }).then((id) => {
				return id;
			});
			id = web3.utils.toUtf8(result.logs[0].args["0"]);
		} else if (type == 1) {
			result = await lms.newCompany({ from: accounts[0] }).then((id) => {
				return id;
			});
			id = web3.utils.toUtf8(result.logs[0].args["0"]);
		} else id = "government";

		res.send(id);
	} catch (error) {
		console.error("Blockchain error:", error);
		// Fallback for demo purposes
		const mockId = req.body.type == 0 ? "user_" + Date.now() : "comp_" + Date.now();
		console.log("Returning mock ID:", mockId);
		res.send(mockId);
	}
};

//signup("deepeshrathi9@gmail.com", "12345678");

module.exports = { newId };

// profile common in all
// user
// companies, govt
// apply for job, apply for loan

// company
// employees, govt, companies
// recurit employee

// govt
// companies , users
