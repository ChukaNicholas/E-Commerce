const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Purchases {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({ amountPaid, sellerID, listingID, buyerID, image}) {
    this.amountPaid = amountPaid
    this.sellerID = sellerID;
    this.listingID = listingID;
    this.buyerID = buyerID;
    this.image = image
  }

  static async list(userID) {
    try {
      const query = 'SELECT * FROM purchases WHERE buyer_id = ?;'; //
      const { rows } = await knex.raw(query, [userID]);
      return rows.map((purchase) => new User(purchase));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // static async find(id) {
  //   try {
  //     const query = 'SELECT * FROM users WHERE id = ?';
  //     const { rows: [user] } = await knex.raw(query, [id]);
  //     return user ? new User(user) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  // static async findByUsername(username) {
  //   try {
  //     const query = 'SELECT * FROM users WHERE username = ?';
  //     const { rows: [user] } = await knex.raw(query, [username]);
  //     return user ? new User(user) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  static async logPurchase(purchase) {
    try {
      // const passwordHash = await authUtils.hashPassword(password);

      const query = `INSERT INTO purchases (price, seller_id, listing_id, buyer_id, image)
        VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [purchase] } = await knex.raw(query, []); // some array of variables
      return new Purchase(purchase);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw('TRUNCATE purchases;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // update = async (username) => { // dynamic queries are easier if you add more properties
  //   try {
  //     const [updatedUser] = await knex('users')
  //       .where({ id: this.id })
  //       .update({ username })
  //       .returning('*');
  //     return updatedUser ? new User(updatedUser) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // };

  // isValidPassword = async (password) => (
  //   authUtils.isValidPassword(password, this.#passwordHash)
  // );
}

module.exports = Purchases;