const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

// importing the model
const User = require('../../models/user');

// get to api/users to register a new user
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields!' });
  }

  //   Check for existing users
  User.findOne({ email })
    .then(user => {
      if (user)
        return res.status(400).json({ message: 'User already exists!' });
      const newUser = new User({ name, email, password });

      //   Create salt and hash
      bcrypt.genSalt(12, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
          if (error) throw error;
          newUser.password = hashedPassword;
          newUser.save().then(user => {
            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (error, token) => {
                if (error) throw error;
                res.json({
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                  token,
                });
              }
            );
          });
        });
      });
    })
    .catch(error => console.log(error));
});

module.exports = router;
