const { createUser, findOneByEmail } = require("../../models/user/user.model");
const { createHash, comparePassword } = require("../../bcrypt");
const authToken = require("~/passport/authToken");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require("../../passport/jwtOptions");


router.get('/still_alive', authToken, async (req, res) => {
	res.status(200).json({ message: "Still Alive !"})
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(401).json({ message: "Empty credentials"})
	} else {
		let user = await findOneByEmail(email);
		if (user) {
			const passCheck = await comparePassword(password, user.password)
			if (passCheck) {
				let token = jwt.sign({id: user._id}, jwtOptions.secretOrKey, jwtOptions.options);
				return res.cookie("access_token", token, {
					httpOnly: true,
					secure: false
				})
				.status(200)
				.json({ message : "User logged in", user: {username: user.username}});
			} else {
				res.status(401).json({ message : "Wrong password" });
			}
		} else {
			res.status(401).json({ message: "User not found"});
		}
	}
});

router.post('/logout', authToken, (req, res) => {
	res.clearCookie("access_token")
	res.status(200).json({ message : "You're logged out."});
});

router.post('/register', async (req, res) => {
	const { email, username, password } = req.body;
	const pass = await createHash(password);
	let user = null;
	try {
		user = await createUser({ email, username, password:pass });
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
