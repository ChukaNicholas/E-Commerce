/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.raw(`
    CREATE TABLE purchases (
        lala INTEGER AUTOINCREMENT,
        price INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        listing_id INTEGER NOT NULL,
        purchased_at DATETIME NOT NULL,
        PRIMARY KEY (lala)
    );
`);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('purchases');


