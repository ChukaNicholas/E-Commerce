const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Bid {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({ amount, seller_id, listing_id, buyer_id}) {
    this.amount = amount;
    this.sellerID = seller_id;
    this.listingID = listing_id;
    this.buyerID = buyer_id;
  }

  static async list() {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await knex.raw(query);
      return rows.map((user) => new User(user));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      const { rows: [user] } = await knex.raw(query, [id]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

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

  static async create(amount, sellerID, listingID, buyerID) {
    try {
      // const passwordHash = await authUtils.hashPassword(password);

      const query = `INSERT INTO bids (amount, seller_id, listing_id, buyer_id)
        VALUES (?, ?, ?, ?) RETURNING *
        
        UPDATE listings SET up_for_auction = TRUE WHERE listing_id = ?
        `;
      const { rows: [bid] } = await knex.raw(query, [amount, sellerID, listingID, buyerID, listingID] ); // some array of variables
      return new Bid(bid);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(listingID) {
    try {
      const query = `DELETE FROM bids WHERE listing_id = ?
      REUTRNING *
      `
      const {rows: [bid]} = await knex.raw(query, [listingID])
      return Bid(bid)
    } catch (err) {
      console.error(err)
      return null
    }
  }

  static async deleteAll() {
    try {
      return knex.raw('TRUNCATE users;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (newAmount ,listingID, buyerID) => { // dynamic queries are easier if you add more properties
    try {
      const query = `UPDATE bids SET amount = ?, buyer_id = ? WHERE listing_id = ? 
       RETURNING *;
       
       UPDATE listings SET price = ? WHERE listing_id = ?;`
      const {rows: [bid] } = await knex.raw(query, [newAmount, buyerID, listingID, newAmount, listingID])
      return bid ? new User(bid) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );
}

module.exports = Bid;