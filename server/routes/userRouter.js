const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const JWT_SECRET = require('../config/config').jwt.JWT_SECRET;

router.get("/test", (req, res) => {
    res.send("Test working!");
});

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, firstName, lastName, companyName, associatedVessels } = req.body;

        // validate
        if (!email || !password || !passwordCheck || !firstName || !lastName)
            return res.status(400).json({ msg: "Not all required fields have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "Passwords must be at least 5 characters long." });
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Please enter the same password twice for verification." });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });

        //generate hash for user password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
            companyName,
            associatedVessels
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  
      // assign payload to user so they can be "logged in" 
      // can later be used to retrieve id of currently logged in user
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          companyName: user.companyName,
          lastName: user.lastName,
          associatedVessels: user.associatedVessels
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //use this to check if a given token is valid and simply return true/false
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      // respond with user's first name and db ID
      firstName: user.firstName,
      email: user.email,
      companyName: user.companyName,
      lastName: user.lastName,
      id: user._id,
      associatedVessels: user.associatedVessels
    });
  });

  router.get("/findVessel", auth, async (req, res) => {
    const vessel = await Vessel.findById(req.user.associatedVessels[0]);
    res.json({
      vesselName: vessel.name,
    });
  });
  
module.exports = router;