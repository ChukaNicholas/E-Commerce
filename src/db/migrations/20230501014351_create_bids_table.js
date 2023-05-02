/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('bids', (table) => {
    table.increments();
    table.decimal('amount', null).notNullable();
    table.integer('seller_id').notNullable();
    table.integer('listing_id').notNullable();
    table.integer('buyer_id').notNullable();
    table.dateTime('created_at', true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('bids');
