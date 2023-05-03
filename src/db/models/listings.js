const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Listing {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({name, image, price, sellerID, description, condition}) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.sellerID = sellerID;
    this.description = description;
    this.condition = condition;
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

  static async create(name, image, price, sellerID, description, condition) {
    try {
      // const passwordHash = await authUtils.hashPassword(password);

      const query = `INSERT INTO listings (name, image, price, seller_id, description, condition)
        VALUES (?, ?, ?, ?, ?, ?) RETURNING *;`;
      const { rows: [listing] } = await knex.raw(query, [name, image, price, sellerID, description, condition]);
      return new Listing(listing);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(listingID) {
    try {
      const query = `DELETE FROM listings WHERE listing_id = ?
      RETURNING *;`
    const {rows: [listing]} = await knex.raw(query, [listingID])
    return new Listing(listing);
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

  update = async (username) => { // dynamic queries are easier if you add more properties
    try {
      const [updatedUser] = await knex('users')
        .where({ id: this.id })
        .update({ username })
        .returning('*');
      return updatedUser ? new User(updatedUser) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );
}

module.exports = Listing;