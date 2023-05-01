/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('purchases', (table) => {
    table.increments();
    table.integer('price').notNullable();
    table.integer('seller_id').notNullable();
    table.integer('listing_id').notNullable();
    table.datetime('purchased_at', true);
    table.integer('buyer_id').notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('purchases');


