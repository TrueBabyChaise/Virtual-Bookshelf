const { createUser, findOneByName } = require("../../models/user/user.model");
const { createHash, comparePassword } = require("../../bcrypt");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require("../../passport/jwtOptions");

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(401);
	} else {
		let user = await findOneByName(username);
		if (user) {
			const passCheck = await comparePassword(password, user.password)
			if (passCheck) {
				let token = jwt.sign(user._id.toJSON(), jwtOptions.secretOrKey);
				res.status(200).json({ message : "User logged in", token: token });
			} else {
				res.status(401).json({ message : "Wrong password" });
			}
		} else {
			res.status(401).json({ message: "User not found"});
		}
	}
});

router.post('/logout', (req, res) => {
	res.status(200).json({ message : "You're logged out."});
});

router.post('/register', async (req, res) => {
	const { username, password } = req.body;
	const pass = await createHash(password);
	let user = null;
	try {
		user = await createUser({ username, password:pass });
	} catch (err) {
		res.status(404).json({ message : "Something went wrong" });
		return;
	}
	if (!user) {
		res.status(403).json({ message : "User already exist" });
	} else {
		res.status(200).json({ message : "User created sucessfully" });
	}
});

module.exports = router
