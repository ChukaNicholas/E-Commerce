/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('purchases', (table) => {
    table.increments();
    table.integer('price').notNullable();
    table.integer('user_id').notNullable();
    table.integer('listing_id').notNullable();
    table.datetime('purchased_at', true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('purchases');


