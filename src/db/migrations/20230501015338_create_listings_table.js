/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('listings', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.text('image').notNullable();
    table.decimal('price', null).notNullable();
    table.integer('seller_id').notNullable();
    table.text('description').notNullable();
    table.string('condition').notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('listings');
