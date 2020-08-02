const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// importing the model
const Item = require('../../models/item');

// get to api/items to fetch all items
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(result => {
      res.json(result);
    })
    .catch(error => console.log(error));
});

// post to api/items to add an item
router.post('/', auth, (req, res) => {
  const item = new Item({ name: req.body.name });
  item
    .save()
    .then(item => {
      res.json(item);
    })
    .catch(error => console.log(error));
});

// post to api/items to delete an item
router.post('/:id', (req, res) => {
  console.log(req.body);
  Item.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json({ success: true });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ success: false });
    });
});

module.exports = router;
