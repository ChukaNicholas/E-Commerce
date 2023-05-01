/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('bids', (table) => {
    table.increments();
    table.integer('amount').notNullable();
    table.integer('seller_id').notNullable();
    table.integer('listing_id').notNullable();
    table.dateTime('created_at', true);
    table.integer('buyer_id').notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('bids');
