const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../../middleware/auth');

// importing the model
const User = require('../../models/user');

// post to api/auth to authenticate a user
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields!' });
  }

  //   Check for existing users
  User.findOne({ email })
    .then(user => {
      if (!user)
        return res.status(400).json({ message: "User doesn't exist!" });

      // validate password
      bcrypt.compare(password, user.password).then(isEqual => {
        if (!isEqual)
          return res.status(400).json({ message: 'Invalid credentials!' });

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
    })
    .catch(error => console.log(error));
});

// get request to api/auth/user to get user data and it is private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
