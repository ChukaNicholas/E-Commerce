const express = require('express');
// const fileUpload = require('express-fileupload');
const userController = require('./controllers/user');
const listingController = require('./controllers/listing')
const bidController = require('./controllers/bid')
const purchaseController = require('./controllers/purchase')

const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');

const Router = express.Router();
Router.use(addModels);

Router.get('/cookieCounter', (req, res,) => {
  const { session } = req;
  console.log(session);
  session.viewCount = (session.viewCount || 0) + 1;
  console.log(session.viewCount);
  res.status(200).send({ count: session.viewCount });
});

// Create
Router.post('/users', userController.create);
Router.post('/users/login', userController.login);
Router.post('/create-listing/:id', listingController.create);
Router.post('/create-bid/:listing_id', bidController.create)
Router.post('/create-purchase/:id', purchaseController.create)


// Read
Router.get('/users', userController.list);
Router.get('/users/:id', userController.show);
Router.get('/me', userController.showMe);
// checkAuthentication middleware is applied to only to this route (and /logged-in-secret)
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

 Router.get('/marketplace/:id', listingController.listNotUserListings)
//  Router.get('/home/:id', listingController.listUserListings)
 Router.get('/find-listing/:id', listingController.find)
 Router.get('/home/:id', purchaseController.list)

// Update
Router.patch('/users/:id', checkAuthentication, userController.update);

// Delete
Router.delete('/users/logout', userController.logout);
Router.delete('/delete-listing/:id', listingController.destroy);

module.exports = Router;
