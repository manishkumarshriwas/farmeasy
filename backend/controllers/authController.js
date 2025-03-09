const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered." });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during signup." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(password)
        console.log(user.password)
        console.log(email)
        console.log(user)
        console.log(isMatch
        )
        



        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during login." });
    }
};
