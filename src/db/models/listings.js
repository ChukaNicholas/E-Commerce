const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Listing {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({name, image, price, seller_id, description, condition}) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.sellerID = seller_id;
    this.description = description;
    this.condition = condition;
  }

  static async listNotUserListings(userID) {
    try {
      const query = `
      SELECT * 
      FROM listings  
      WHERE seller_id != ? `;
      const { rows } = await knex.raw(query, [userID]);
      return rows.map((listing) => new Listing(listing));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async listUserListings(userID) {
    try {
      const query = `SELECT * FROM listings  WHERE seller_id = ?`;
      const { rows } = await knex.raw(query, [userID]);
      return rows.map((listing) => new Listing(listing));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = 'SELECT * FROM listings WHERE id = ?';
      const { rows: [listing] } = await knex.raw(query, [id]);
      return listing ? new Listing(listing) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = ?';
      const { rows: [user] } = await knex.raw(query, [username]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(listingInfo) {
    try {
      const {
        body: { name,
        image,
        price,
        description,
        condition,
        upForAuction },
        id : sellerID,
      } = listingInfo
      const query = `
        INSERT INTO listings (name, image, price, seller_id, description, condition, up_for_auction)
        VALUES (?, ?, ?, ?, ?, ?, ?) 
        RETURNING *;`;
      const { rows: [listing] } = await knex.raw(query, [name, image, price, sellerID ,description, condition, upForAuction]);
      return new Listing(listing);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(listingID) {
    try {
      const query = `
      DELETE FROM listings 
      WHERE id = ?
      RETURNING *;`
    const {rows: [listing]} = await knex.raw(query, [listingID])
    return listing ? new Listing(listing) : null;
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

  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );
}

module.exports = Listing;