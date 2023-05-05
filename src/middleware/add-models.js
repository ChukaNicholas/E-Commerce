const User = require('../db/models/user');
const Listing = require('../db/models/listings')
const Purchase = require('../db/models/purchases')
const Bid = require('../db/models/bids')

const addModels = (req, res, next) => {
  req.db = {
    User,
    Listing,
    Purchase,
    Bid
  };
  next();
};

module.exports = addModels;
