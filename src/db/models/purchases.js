const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Purchase {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({ price, seller_id, listing_id, buyer_id, image}) {
    this.amountPaid = price
    this.sellerID = seller_id;
    this.listingID = listing_id;
    this.buyerID = buyer_id;
    this.image = image
  }

  static async list(userID) {
    try {
      const query = `
      SELECT * 
      FROM purchases 
      WHERE buyer_id = ?;`; 
      const { rows } = await knex.raw(query, [userID]);
      console.log(rows)
      return rows.map((purchase) => new Purchase(purchase));
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

  static async create(amountPaid, sellerID, listingID, buyerID, image) {
    try {
      // const passwordHash = await authUtils.hashPassword(password);
      const query1 = `
        INSERT INTO purchases (price, seller_id, listing_id, buyer_id, image)
        VALUES (?, ?, ?, ?, ?) 
        RETURNING *;`
      const { rows: [purchase] } = await knex.raw(query1, [amountPaid, sellerID, listingID, buyerID, image]);
      const query2 = `
        DELETE FROM listings  
        WHERE id = ?
        RETURNING *;`
      const { rows: [listing] } = await knex.raw(query2, [listingID]);
      return new Purchase(purchase);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(purchaseID) {
    try {
      const query = `
      DELETE FROM purchases 
      WHERE purchase_id = ?
      RETURNING *;`
      const { rows: [purchase] } = await knex.raw(query, [purchaseID]); // some array of variables
      return new Purchase(purchase);
    } catch (err) {
      console.error(err)
      return null
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

module.exports = Purchase;